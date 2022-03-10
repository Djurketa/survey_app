import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const surveyApiHeaders = {
	host: "",
};
const baseUrl = "";
const createRequest = (url) => ({ url, headers: surveyApiHeaders });

export const surveyApi = createApi({
	reducerpath: "surveyApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getStats: builder.query({
			query: () => createRequest("/api/stats"),
		}),
		getSurveys: builder.query({
			query: (limit) => createRequest("/api/surveys?limit=" + limit),
		}),
		createSurvayQuestions: builder.query({
			query: (survay) =>
				createRequest("/createSurvayQuestions", "POST", survay),
		}),
	}),
});
export const {
	useGetSurveysQuery,
	useGetStatsQuery,
	useCreateSurvayquestuibsQuery,
} = surveyApi;
