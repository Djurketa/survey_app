import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSurveysAsync = createAsyncThunk(
	"surveys/getSurveysAsync",
	async () => {
		const response = await fetch("http://localhost:1337/surveys", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-access-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IkpvdmFuIiwiaWF0IjoxNjQ1NTM3NDQ3LCJleHAiOjE2NDU1NDQ2NDd9.tuRtYxuog6nCidC68YOPoTCnEpd1BTfhVI0DETRhmHQ",
			},
		});
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
	},
});

export const {} = surveysSlice.actions;
export default surveysSlice.reducer;
