import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion } from "../../slices/surveySlice";
import { nanoid } from "nanoid";

function AddQuestion() {
	const dispatch = useDispatch();

	const [questionType, setQuestiontype] = useState();

	const survey = useSelector((state) => state.survey);

	function handleQuestionType(e) {
		const type = e.target.getAttribute("data-type");
		setQuestiontype(type);
	}
	useEffect(() => {
		if (questionType) {
			const questionData = {
				id: survey.questions.length + 1,
				title: "Question title",
				type: questionType,
				options:
					questionType === "multiple-choice" || questionType == "checkbox"
						? [
								{
									id: nanoid(),
									ans: "Question answer",
								},
								{
									id: nanoid(),
									ans: "Question answer",
								},
						  ]
						: [],
			};
			//adding question object to state array
			dispatch(addQuestion(questionData));
			//set current question current state object
			setQuestiontype("");
		}
	}, [questionType]);

	return (
		<div className="editor-menu-question-types">
			<button
				onClick={handleQuestionType}
				className="editor-btns"
				data-type="single-line">
				Single Line Text
			</button>
			<button
				onClick={handleQuestionType}
				className="editor-btns"
				data-type="multiple-choice">
				Multiple Choice
			</button>
			<button
				onClick={handleQuestionType}
				className="editor-btns"
				data-type="multiple-line">
				Multiple Line Text
			</button>
			<button
				onClick={handleQuestionType}
				className="editor-btns"
				data-type="checkbox">
				Checkbox
			</button>
			<button
				onClick={handleQuestionType}
				className="editor-btns"
				data-type="dropdown">
				Dropdown
			</button>
		</div>
	);
}

export default AddQuestion;
