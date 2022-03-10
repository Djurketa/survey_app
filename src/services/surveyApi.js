import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const surveyApiHeaders = {
	host: "%PUBLIC_URL%",
};
const baseUrl = "%PUBLIC_URL%";
const createRequest = (url) => ({ url, headers: surveyApiHeaders });

export const surveyApi = createApi({
	reducerpath: "surveyApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getStats: builder.query({
			query: () => createRequest("/stats"),
		}),
		getSurveys: builder.query({
			query: (limit) => createRequest("/surveys?limit=" + limit),
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
