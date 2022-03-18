import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const surveyApiHeaders = {
	host: "",
};
const baseUrl = "http://localhost:1337";
// const baseUrl = "https://surveyapp2022.herokuapp.com";
const createRequest = (url) => ({ url, headers: surveyApiHeaders });

export const surveyApi = createApi({
	reducerpath: "surveyApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getStats: builder.query({
			query: () => createRequest(baseUrl + "/api/stats"),
		}),
		getSurveys: builder.query({
			query: (limit) => createRequest(baseUrl + "/api/surveys?limit=" + limit),
		}),
		createSurvayQuestions: builder.query({
			query: (survay) =>
				createRequest(baseUrl + "/createSurvayQuestions", "POST", survay),
		}),
	}),
});
export const {
	useGetSurveysQuery,
	useGetStatsQuery,
	useCreateSurvayquestuibsQuery,
} = surveyApi;
