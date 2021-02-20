//TODO:: ADD error handling when unsupported browsers

const PerfAnalytics = (apiUrl) => {
	const createAnlytics = () => {
		window._perfanalytics = {
			dom_load: null,
			window_load: null,
			ttfb: null,
			fcp: null,
			resources: [],

			url: window.location.href,
			user_agent: navigator.userAgent,
		};
	};

	const getAnlytics = () => {
		return window._perfanalytics;
	};

	const createDataFromPerformance = () => {
		const anlytics = getAnlytics();
		const timing = window.performance.timing;

		anlytics.ttfb = timing.responseStart - timing.requestStart;
		anlytics.dom_load =
			timing.domContentLoadedEventEnd - timing.navigationStart;
		anlytics.window_load = new Date().valueOf() - timing.navigationStart;
	};

	const initPerformanceObserver = () => {
      if(typeof(PerformanceObserver) === 'undefined') return;

		const createResourceDataFromEntry = (entry) => ({
			name: entry.name,
			type: entry.initiatorType,
			responseStart: entry.responseStart,
			responseEnd: entry.responseEnd,
		});

		const entryHandler = (entry) => {
			switch (entry.entryType) {
				case "resource":
					getAnlytics().resources.push(createResourceDataFromEntry(entry));
					break;
				case "paint":
					if (entry.name === "first-contentful-paint")
						getAnlytics().fcp = entry.startTime;
					break;
			}
		};

		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) entryHandler(entry);
		});

		observer.observe({ entryTypes: ["paint", "resource"] });
	};

	const isPerformanceSupported = () => {
		return (
			window.performance &&
			!!window.performance.getEntriesByType &&
			!!window.performance.timing
		);
	};

	const init = () => {
		if (!isPerformanceSupported()) return;
		createAnlytics();
		initPerformanceObserver();

		window.addEventListener("load", () => {
			createDataFromPerformance();

			console.log("beacon request", getAnlytics());
			window.addEventListener("unload", () => {
				navigator.sendBeacon(apiUrl, JSON.stringify(getAnlytics()));
			})
		});
	};

	return {
		init,
	};
};
