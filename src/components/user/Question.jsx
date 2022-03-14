import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBtns from "./QuestionBtns";
import { setAnswer } from "../../slices/surveySlice";
function Question({ question, rownum }) {
	const dispatch = useDispatch();
	const currentQuestion = useSelector((state) => state.survey.currentQuestion);
	const [checked, setChecked] = useState();

	function isChecked(e) {
		setChecked(true);
	}
	function handleAnswerChange(e) {
		const answer = {
			answer_id: e.target.id,
			question_id: e.target.getAttribute("name"),
			checked: e.target.checked || false,
			type: e.target.getAttribute("type"),
			value: e.target.value,
		};
		dispatch(setAnswer(answer));
	}
	function renderQuestion(question, rownum) {
		switch (question.type) {
			case "multiple-choice":
				return (
					<div
						question_id={question.id}
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h2>
							{rownum}. {question.title}
						</h2>
						{question.options.map((option, key) => {
							return (
								<div key={key}>
									<input
										onClick={isChecked}
										onChange={handleAnswerChange}
										type="radio"
										id={option.id}
										name={question.id}
										value={option.ans}></input>
									<label htmlFor={option.id}>{option.ans}</label>
								</div>
							);
						})}
						<QuestionBtns question_id={question.id} />
					</div>
				);
				break;
			case "checkbox":
				return (
					<div
						question_id={question.id}
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h2>
							{rownum}. {question.title}
						</h2>
						{question.options.map((option, key) => {
							return (
								<div key={key}>
									<input
										onClick={isChecked}
										onChange={handleAnswerChange}
										type="checkbox"
										id={option.id}
										name={question.id}
										value={option.ans}></input>
									<label htmlFor={option.id}>{option.ans}</label>
								</div>
							);
						})}
						<QuestionBtns question_id={question.id} />
					</div>
				);
				break;
			case "multiple-line":
				return (
					<div
						question_id={question.id}
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h2>
							{rownum}. {question.title}
						</h2>
						<textarea
							onChange={handleAnswerChange}
							id={question.id}
							name={question.id}
							type="textarea"
							rows="1"
							cols="100"></textarea>
						<QuestionBtns question_id={question.id} />
					</div>
				);
				break;
			case "single-line":
				return (
					<div
						question_id={question.id}
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h2>
							{rownum}. {question.title}
						</h2>
						<input
							onChange={handleAnswerChange}
							type="text"
							id={question.id}
							name={question.id}
							value={question.ans}></input>
						<QuestionBtns question_id={question.id} />
					</div>
				);
				break;
		}
	}
	return <>{renderQuestion(question, rownum)}</>;
}

export default Question;
