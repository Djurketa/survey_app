import http from "../http-common";

function getSurveys(limit) {
	return http.get("/surveys?limit=" + limit);
}
function createSurvay(data){
	return http.post("/survey",data)
}
export default {
	getSurveys,
	createSurvay
};
