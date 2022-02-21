import React from "react";
import { useSelector } from "react-redux";
import QuestionBtns from "./QuestionBtns";
function Question({ question, rownum }) {
	const currentQuestion = useSelector((state) => state.survey.currentQuestion);

	function renderQuestion(question, rownum) {
		console.log(rownum);
		switch (question.type) {
			case "multiple-choice":
				return (
					<div
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h3>
							{rownum}. {question.title}
						</h3>
						{question.options.map((option, key) => {
							return (
								<div key={key}>
									<input
										type="radio"
										id={option.id}
										name={question.id}
										value={option.ans}></input>
									<label htmlFor={option.id} name={option.ans}>
										{option.ans}
									</label>
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
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h3>
							{rownum}. {question.title}
						</h3>
						{question.options.map((option, key) => {
							return (
								<div key={key}>
									<input
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
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h3>
							{rownum}. {question.title}
						</h3>
						<textarea
							id={question.id}
							name={question.title}
							rows="5"
							cols="100"></textarea>
						<QuestionBtns question_id={question.id} />
					</div>
				);
				break;
			case "single-line":
				return (
					<div
						className={`question-wrapper ${
							currentQuestion.id == question.id ? "active-question" : ""
						}`}>
						<h3>
							{rownum}. {question.title}
						</h3>
						<input
							type="text"
							id={question.id}
							name={question.title}
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
