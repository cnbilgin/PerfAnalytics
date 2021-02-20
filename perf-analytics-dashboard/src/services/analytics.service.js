import serviceHelper from "../utilities/serviceHelper";

function getAll(date = null) {
	const params = {};
	if (date !== null) {
		if (date.startDate !== null)
			params.startDate = date.startDate.toISOString();
		if (date.endDate !== null) params.endDate = date.endDate.toISOString();
	}
	return serviceHelper.get(`analytics`, { params });
}

export const analyticsService = {
	getAll,
};
