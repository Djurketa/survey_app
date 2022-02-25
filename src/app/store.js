import { configureStore } from "@reduxjs/toolkit";
import { surveyApi } from "../services/surveyApi";
import surveyItemReducer from "../slices/surveySlice";
import surveysReducer from "../slices/surveysSlice";
export default configureStore(
	{
		reducer: {
			aleksa: [],
			survey: surveyItemReducer,
			surveys: surveysReducer,
			[surveyApi.reducerPath]: surveyApi.reducer,
		},
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
