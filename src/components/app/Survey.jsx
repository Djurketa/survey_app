import React from "react";
import { FaClipboardList, FaCalendarAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import ActionButtons from "../user/ActionButtons";
function Survey({ survey = {} }) {
	return (
		<>
			<Link className="card" to={`/survey/${survey.survey_id}`}>
				<div className="card-sec item-category-img">
					<div>
						<img
							src={
								require("../../images/categories/" + survey.category_img) || ""
							}
						/>
						<p> Politics</p>
					</div>
				</div>
				<div className="card-sec">
					<h2>{survey.title}</h2>
				</div>
				<div className="card-sec">
					<div className="inner-sec">
						<p>Questions</p>
						<h3>{survey.questions_num}</h3>
					</div>
					<div className="inner-sec">
						<p>Finished</p>
						<h3>10</h3>
					</div>
					<div className="inner-sec">
						<p>Date</p>
						<h3>
							{new Intl.DateTimeFormat("sr", {
								year: "2-digit",
								month: "2-digit",
								day: "2-digit",
							}).format(survey.date_created)}
						</h3>
					</div>
				</div>
				<div className="card-sec">
					<p>{survey.desc}</p>
				</div>
				<div className="card-sec share-btns">
					<button className="btn"> T</button>
					<button className="btn"> F</button>
					<button className="btn"> G</button>
				</div>
				<div className="card-sec">
					<button className="btn btn-primary">View Survey</button>
				</div>
			</Link>
			{/* <Link
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
						<FaClipboardList /> Question num:
						{survey.questions_num}
					</p>
				</div>
				<div className=" item-meta">
					<p>
						<FaCalendarAlt /> Date:
						{new Intl.DateTimeFormat("sr", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
						}).format(survey.date_created)}
					</p>
				</div>
				<ActionButtons survey_id={survey.survey_id} />
			</Link> */}
		</>
	);
}

export default Survey;
