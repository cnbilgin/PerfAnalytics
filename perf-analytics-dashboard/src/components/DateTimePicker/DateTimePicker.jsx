import React from "react";
import moment from "moment";
import "moment/locale/tr";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function DateTimePicker(props) {
	return <Datetime {...props} />;
}
