import DashboardChart from "../DashboardChart/DashboardChart";
import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
	return (
		<Container className="mb-5">
			<header className="py-4 mb-3">
				<h1>PerfAnalytics</h1>
			</header>
			<DashboardChart />
		</Container>
	);
}

export default App;
