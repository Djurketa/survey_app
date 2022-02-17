import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion, deleteQuestion } from "../../slices/surveySlice";

function QuestionBtns({ question_id }) {
	const survey = useSelector((state) => state.survey);

	const dispatch = useDispatch();

	function handleEditClick(e) {
		//finds question from state by id
		const [question] = survey.questions.filter(
			(question) => question.id == question_id
		);
		// set current question with clicked question
		dispatch(setCurrentQuestion(question));
	}

	function handleDeleteClick(e) {
		dispatch(deleteQuestion(question_id));
	}
	return (
		<div className="question-btns-wrapper">
			<button onClick={handleEditClick} className="editor-btns edit">
				Edit
			</button>
			<button onClick={handleDeleteClick} className="editor-btns del">
				Delete
			</button>
		</div>
	);
}

export default QuestionBtns;
