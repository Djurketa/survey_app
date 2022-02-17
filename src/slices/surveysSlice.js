import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSurveysAsync = createAsyncThunk(
	"surveys/getSurveysAsync",
	async () => {
		const response = await fetch("http://localhost:1337/surveys");
		if (response.ok) {
			const { surveys } = await response.json();
			return { surveys };
		}
	}
);
export const insertSurveysAsync = createAsyncThunk(
	"surveys/insertSurveysAsync",
	async (payload) => {
		const response = await fetch("http://localhost:1337/survey", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ payload }),
		});
		if (response.ok) {
			const id = await response.json();
			return id;
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
		[insertSurveysAsync.fulfilled]: (state, action) => {
			alert(action.payload.id);
		},
	},
});

export const {} = surveysSlice.actions;
export default surveysSlice.reducer;
