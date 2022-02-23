import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const defaultState = {
	currentQuestion: {},
	user_id: 0,
	title: "Survey Title",
	description: "Survey description",
	questions: [
		// {
		//     id:'',
		//     type:'',
		//     title:'',
		//     options:[{id:132,ans:'Sdssjkd'},{id:12,ans:'Sdssjssskd'}]
		// },
	],
};
export const LoginSurveysAsync = createAsyncThunk(
	"surveys/LoginSurveysAsync",
	async (payload) => {
		const response = await fetch("http://localhost:1337/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ payload }),
		});
		if (response.ok) {
			const responce = await response.json();
			return responce;
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
				"x-access-token": sessionStorage.getItem("token"),
			},
			body: JSON.stringify({ payload }),
		});
		if (response.ok) {
			const id = await response.json();
			return id;
		}
	}
);

export const getSurveyAsync = createAsyncThunk(
	"surveys/getSurveyAsync",
	async (payload) => {
		const response = await fetch("http://localhost:1337/selectSurvey", {
			body: JSON.stringify({ payload }),
		});
		if (response.ok) {
			const { surveys } = await response.json();
			return { surveys };
		}
	}
);

export const surveySlice = createSlice({
	name: "surveyItem",
	// initialState: [],
	initialState: defaultState,
	reducers: {
		addQuestion: (state, action) => {
			state.currentQuestion = action.payload;
			state.questions.push(action.payload);
		},
		editSurvey: (state, action) => {
			return { ...state, ...action.payload };
		},
		setCurrentQuestion: (state, action) => {
			const [currentQuestion] = state.questions.filter(
				(question) => question.id == action.payload
			);
			console.log(currentQuestion, action.payload);
			state.currentQuestion = currentQuestion;
		},
		updateQuestion: (state, { payload }) => {
			const questions = state.questions.map((question) => {
				if (question.id == payload.id) {
					return { ...question, ...payload };
				} else {
					return { ...question, ...question };
				}
			});
			return {
				...state,
				...{ currentQuestion: payload, questions: questions },
			};
		},
		deleteQuestion: (state, action) => {
			//remove seleced question and reorder question ids
			const questions = state.questions
				.filter((question) => question.id != action.payload)
				.map((question, i) => {
					return { ...question, ...{ id: i + 1 } };
				});
			//check if deleted question is current question
			// const curQ =
			// 	state.currentQuestion.id == action.payload ? {} : state.currentQuestion;
			return {
				...state,
				...{ currentQuestion: {}, questions: questions },
			};
		},
	},
	extraReducers: {
		[LoginSurveysAsync.fulfilled]: (state, action) => {
			sessionStorage.setItem("state", action.payload);
		},
		[getSurveyAsync.fulfilled]: (state, action) => {
			// return action.payload;
			console.log(action.payload);
		},
		[insertSurveysAsync.fulfilled]: (state, action) => {
			// state.questions = action.payload.questions;
			return { ...state, ...action.payload };
		},
	},
});

export const {
	addItem,
	addQuestion,
	editSurvey,
	updateQuestion,
	setCurrentQuestion,
	deleteQuestion,
} = surveySlice.actions;
export default surveySlice.reducer;
