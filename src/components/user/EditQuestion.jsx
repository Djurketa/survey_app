import { nanoid } from "nanoid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../slices/surveySlice";

function EditQuestion() {
	const dispatch = useDispatch();

	const currentQuestion = useSelector((state) => state.survey.currentQuestion);

	function handleQuestionTitleChange(e) {
		const questionId = e.target.id;
		const questionTitle = e.target.value;
		const question = {
			...currentQuestion,
			...{
				id: parseInt(questionId),
				title: questionTitle,
			},
		};

		// dispatch(setCurrentQuestion(question));
		dispatch(updateQuestion(question));
	}
	function handleQuestionAnsChange(e) {
		const opt = {
			id: e.target.id,
			ans: e.target.value,
		};
		const newOptions = currentQuestion.options.map((options) => {
			if (options.id == opt.id) {
				return { ...options, ...opt };
			} else {
				return { ...options, ...options };
			}
		});
		const updatedQuestion = { ...currentQuestion, ...{ options: newOptions } };
		// dispatch(setCurrentQuestion(updatedQuestion));
		dispatch(updateQuestion(updatedQuestion));
	}
	function handleRemoveOption(e) {
		if (currentQuestion.options.length > 2) {
			const newOptions = currentQuestion.options.filter(
				(e, i) => i != currentQuestion.options.length - 1
			);

			const updatedQuestion = {
				...currentQuestion,
				...{ options: newOptions },
			};
			dispatch(updateQuestion(updatedQuestion));
		}
	}
	function handleAddRemoveOprion(e) {
		const newOptions = [
			...currentQuestion.options,
			{
				id: nanoid(),
				ans: "Question answer",
			},
		];

		const updatedQuestion = {
			...currentQuestion,
			...{ options: newOptions },
		};
		dispatch(updateQuestion(updatedQuestion));
	}
	return (
		<>
			{currentQuestion.id ? (
				<div className="editor-edit-question">
					<div className="form-group">
						<label htmlFor="question-title">
							{currentQuestion.id}. Question title
						</label>
						<input
							onChange={handleQuestionTitleChange}
							type="text"
							id={currentQuestion.id}
							value={currentQuestion.title}
						/>
					</div>
					{currentQuestion.options.length ? (
						<div className="form-group">
							<label htmlFor="question-title">
								{currentQuestion.id}. Question answers
							</label>
							<div className="df">
								<button
									onClick={handleRemoveOption}
									className="editor-btns edit">
									-
								</button>
								<button
									onClick={handleAddRemoveOprion}
									className="editor-btns edit">
									+
								</button>
							</div>
							{currentQuestion.options.map((option, key) => {
								return (
									<input
										key={key}
										// data="option"
										onChange={handleQuestionAnsChange}
										type="text"
										id={option.id}
										value={option.ans}
									/>
								);
							})}
						</div>
					) : (
						""
					)}
				</div>
			) : (
				<center>
					<b>Add or select question</b>
				</center>
			)}
		</>
	);
}

export default EditQuestion;
