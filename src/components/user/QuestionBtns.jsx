import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentQuestion, deleteQuestion } from "../../slices/surveySlice";
import { useLocation } from "react-router-dom";

function QuestionBtns({ question_id }) {
	const dispatch = useDispatch();
	const location = useLocation();
	console.log(location.pathname, location.pathname == "/createsurvey");
	function handleEditClick(e) {
		dispatch(setCurrentQuestion(question_id));
	}

	function handleDeleteClick(e) {
		dispatch(deleteQuestion(question_id));
	}
	return (
		<>
			{location.pathname == "/createsurvey" && (
				<div className="question-btns-wrapper">
					<button onClick={handleEditClick} className="btn btn-sm btn-primary">
						Select
					</button>
					<button onClick={handleDeleteClick} className="btn btn-sm btn-danger">
						Delete
					</button>
				</div>
			)}
		</>
	);
}

export default QuestionBtns;
