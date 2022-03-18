import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:1337";
// /const baseUrl = "https://surveyapp2022.herokuapp.com";

export const getSurveysAsync = createAsyncThunk(
	"surveys/getSurveysAsync",
	async () => {
		const response = await fetch(baseUrl + "/api/surveys/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const { surveys } = await response.json();
			return { surveys };
		}
	}
);
export const getUserSurveysAsync = createAsyncThunk(
	"surveys/getUserSurveysAsync",
	async (payload) => {
		const response = await fetch(
			baseUrl + "/api/usersurveys?user_id=" + payload,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.ok) {
			const { surveys } = await response.json();
			return { surveys };
		}
	}
);

const surveysSlice = createSlice({
	name: "surveys",
	initialState: {
		surveys: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: {
		[getSurveysAsync.fulfilled]: (state, action) => {
			// return action.payload;
			state.status = "succeeded";
			state.surveys = state.surveys.concat(action.payload.surveys);
		},
		[getUserSurveysAsync.fulfilled]: (state, action) => {
			// return action.payload;
			state.status = "succeeded";
			state.userSurveys = action.payload.surveys;
		},
	},
});

export const {} = surveysSlice.actions;
export default surveysSlice.reducer;
