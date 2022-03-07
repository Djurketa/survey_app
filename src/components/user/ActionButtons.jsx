import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getSurveyAsync } from "../../slices/surveySlice";

function ActionButtons({ survey_id }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const session = useSelector((state) => {
		return state.survey.session;
	});

	function handleEditClick(e) {
		e.preventDefault();
		dispatch(getSurveyAsync(survey_id));
		navigate("/createsurvey");
	}
	return (
		<>
			{location.pathname == "/mysurveys" && (
				<div>
					<div className="item-meta">
						<button
							data-id={survey_id}
							onClick={handleEditClick}
							className="btn btn-sm  ">
							Edit
						</button>
						<button
							data-id={survey_id}
							onClick={handleEditClick}
							className="btn btn-sm">
							Publish
						</button>
						<button
							data-id={survey_id}
							onClick={handleEditClick}
							className="btn btn-sm ">
							Delete
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default ActionButtons;
