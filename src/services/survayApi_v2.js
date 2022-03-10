import http from "../http-common";

function getSurveys(limit) {
	return http.get("/api/surveys?limit=" + limit);
}
function createSurvay(data) {
	return http.post("/api/survey", data);
}
export default {
	getSurveys,
	createSurvay,
};
