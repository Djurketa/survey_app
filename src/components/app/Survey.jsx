import React from "react";
import { FaClipboardList, FaCalendarAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import ActionButtons from "../user/ActionButtons";
function Survey({ survey = {} }) {
	return (
		<>
			<Link
				className="survey-item-container"
				to={`/survey/${survey.survey_id}`}>
				<div className="item-category-img">
					<img
						className=""
						src={
							require("../../images/categories/" + survey.category_img) || ""
						}
					/>
					<span>{survey.category}</span>
				</div>
				<div className="item-description">
					<h3>{survey.title}</h3>
					<p>{survey.desc} </p>
				</div>
				<div className=" item-meta">
					<p>
						<FaClipboardList /> Question num
					</p>
					<h3>{survey.questions_num}</h3>
				</div>
				<div className=" item-meta">
					<p>
						<FaCalendarAlt /> Date
					</p>
					<h3>
						{new Intl.DateTimeFormat("sr", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
						}).format(survey.date_created)}
					</h3>
				</div>
				<ActionButtons survey_id={survey.survey_id} />
			</Link>
		</>
	);
}

export default Survey;
