import { ConsoleSqlOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBtns from "./QuestionBtns";
import { setAnsewer } from "../../slices/surveySlice";
function Question({ question, rownum }) {
	const dispatch = useDispatch();
	const currentQuestion = useSelector((state) => state.survey.currentQuestion);
	const [answers, setAnswers] = useState([]);
	const [checked, setChecked] = useState();

	function isChecked(e) {
		setChecked(true);
	}
	function handleCheckboxChange(e) {
		const ans = {
			answer_id: e.target.id,
			question_id: e.target.getAttribute("name"),
			checked: e.target.checked,
			type: e.target.getAttribute("type"),
		};
		dispatch(setAnsewer(ans));
		// if (ans.checked) {
		// 	setAnswers([...answers, ans]);
		// } else {
		// 	const filtered = answers.filter((item) => {
		// 		return item.answer_id != ans.answer_id;
		// 	});
		// 	setAnswers(filtered);
		// }
		// console.log(answers);
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
										onChange={handleCheckboxChange}
										type="radio"
										id={option.id}
										name={question.id}
										value={option.ans}></input>
									<label htmlFor={question.id} name={option.ans}>
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
										onChange={handleCheckboxChange}
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
							id={question.id}
							name={question.title}
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
