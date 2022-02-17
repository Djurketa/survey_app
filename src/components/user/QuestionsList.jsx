import React from "react";
import { useSelector } from "react-redux";
import Question from "./Question";

function QuestionsList() {
	const questions = useSelector((state) => state.survey.questions);
	return (
		<>
			{questions.map((question, key) => {
				return <Question key={key} question={question} />;
			})}
		</>
	);
}

export default QuestionsList;
