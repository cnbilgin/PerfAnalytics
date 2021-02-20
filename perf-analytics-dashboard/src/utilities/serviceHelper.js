import axios from "axios";

const serviceHelper = axios.create({
	baseURL: process.env.REACT_APP_ApiAddress,
});

serviceHelper.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (error.response) return Promise.reject(error.response.data);
	}
);

export default serviceHelper;
