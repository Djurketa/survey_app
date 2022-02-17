import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../slices/surveySlice";
import SurveyItemsList from "./SurveyItemsList";
import surveyApi from "../../services/survayApi_v2";
import { useSelector } from "react-redux";
import SurveyEditor from "./SurveyEditor";

function CreateSurvey() {
	const dispatch = useDispatch();
	const [type, setType] = useState("checkbox");
	const [num, setNum] = useState([0]);
	const [answers, setAnswers] = useState([]);
	const [question, setQuestion] = useState([]);
	const [title, setTitle] = useState();
	const items = useSelector((state) => state.items);

	const answersList = num.map((i) => (
		<input
			key={i}
			id={i + 1}
			placeholder={`Enter answer ${i + 1}`}
			onChange={onAnswerChange}
		/>
	));

	function onTypeChange(e) {
		setType(e.target.value);
	}
	function onNumChange(e) {
		setNum(Array.from(Array(parseInt(e.target.value)).keys()));
	}
	function onQuestionChange(e) {
		setQuestion(e.target.value);
	}
	function onTitleChange(e) {
		setTitle(e.target.value);
	}

	function onAnswerChange(e) {
		let index = answers.findIndex((x) => x.id == e.target.id);
		if (index !== -1) {
			answers[index].ans = e.target.value;
			setAnswers(answers);
		} else {
			setAnswers([...answers, { id: e.target.id, ans: e.target.value }]);
		}
	}
	function onSaveClick(e) {
		e.preventDefault();
		let data = {
			id: Date.now(),
			type: type,
			question: question,
			answers: answers,
		};

		answers.forEach((e, i) => {
			data["ans" + (i + 1)] = e.ans;
		});

		dispatch(addItem(data));
	}

	function click() {
		const data = {};
		data.questions = items.map((item) => {
			return Object.keys(item)
				.filter((key) => {
					return key !== "answers" && key !== "id";
				})
				.reduce((cur, key) => {
					return Object.assign(cur, { [key]: item[key] });
				}, {});
		});
		data.name = title;
		surveyApi.createSurvay({ data }).then((response) => {
			alert(responce);
		});
	}
	return (
		<>
			<div className="form-wrapper">
				<form>
					<h1>Create Survey </h1>
					<h3>Enter survey title</h3>
					<input onChange={onTitleChange} placeholder="Text" />
					<h3>Question type</h3>
					<select
						placeholder="Select type"
						defaultValue="checkbox"
						onChange={onTypeChange}>
						<option value="checkbox">Chackbox</option>
						<option value="radio">Radio Group</option>
						<option value="textarea">Textarea</option>
					</select>
					{type !== "textarea" ? (
						<>
							<h3>Answers num</h3>
							<input
								type="number"
								min={1}
								max={10}
								defaultValue={1}
								onChange={onNumChange}
							/>
						</>
					) : (
						""
					)}
					<h3>Enter question text</h3>
					<input onChange={onQuestionChange} placeholder="Text" />
					{type !== "textarea" ? (
						<>
							<h3>Answers</h3>

							{answersList}
						</>
					) : (
						""
					)}
					<button type="primary" onClick={onSaveClick}>
						Save
					</button>
					<button onClick={click}>klik</button>
				</form>

				<div>
					<div>
						<h1>{title}</h1>
						<SurveyItemsList />
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateSurvey;
