import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import DateTimePicker from "../DateTimePicker/DateTimePicker";

export default function FilterContainer({ onFilter }) {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const onChangeDate = {
		start: (value) => {
			setStartDate(value);
			if (endDate !== null && value > endDate) setEndDate(value);
		},
		end: (value) => {
			if (value > startDate) setEndDate(value);
			else setEndDate(startDate);
		},
	};

	const isValidDate = {
		start: () => true,
		end: (selectedDate, a) => {
			if (startDate === null || selectedDate >= startDate) return true;
			return false;
		},
	};

	const handleFilter = () => {
		//...

		onFilter({ startDate, endDate });
	};

	return (
		<Row className="align-items-end mb-4">
			<Col lg={8}>
				<Row>
					<Col lg={6} className="mt-3">
						<Form.Group className="mb-0">
							<Form.Label>Start Date</Form.Label>
							<DateTimePicker
								value={startDate}
								onChange={onChangeDate["start"]}
							/>
						</Form.Group>
					</Col>
					<Col lg={6} className="mt-3">
						<Form.Group className="mb-0">
							<Form.Label>End Date</Form.Label>
							<DateTimePicker
								value={endDate}
								onChange={onChangeDate["end"]}
								isValidDate={isValidDate["end"]}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Col>
			<Col lg={4} className="mt-3">
				<Button variant="primary" block onClick={handleFilter}>
					Filter
				</Button>
			</Col>
		</Row>
	);
}
