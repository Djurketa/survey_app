import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion } from "../../slices/surveySlice";
import { nanoid } from "nanoid";
import { FaDotCircle, FaMinus, FaListAlt, FaCheckSquare } from "react-icons/fa";

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
				className="btn  "
				data-type="single-line">
				<FaMinus className="icns" />
				Single Line Text
			</button>

			<button
				onClick={handleQuestionType}
				className="btn  "
				data-type="multiple-choice">
				<FaDotCircle className="icns" />
				Multiple Choice
			</button>
			<button
				onClick={handleQuestionType}
				className="btn  "
				data-type="multiple-line">
				<FaListAlt className="icns" />
				Multiple Line Text
			</button>
			<button
				onClick={handleQuestionType}
				className="btn  "
				data-type="checkbox">
				<FaCheckSquare className="icns" />
				Checkbox
			</button>
			{/* <button
				onClick={handleQuestionType}
				className="btn btn-secondary"
				data-type="dropdown">
				Dropdown
			</button> */}
		</div>
	);
}

export default AddQuestion;
