import React from "react";
import icon from "../../images/logo3.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSession } from "../../slices/surveySlice";
function Navbar() {
	const session = useSelector((state) => state.survey.session);
	const dispatch = useDispatch();

	function handleLogoutClick() {
		dispatch(setSession({}));
	}
	return (
		<div className="nav-container">
			<div className="logo-container">
				<img className="logo-img" src={icon} />

				<Link className="logo" to="">
					SurveyApp{" "}
				</Link>
			</div>
			<ul className="menu" theme="dark">
				<li>
					<NavLink to="/"> Home </NavLink>
				</li>
				<li>
					<NavLink to="/surveys"> Surveys</NavLink>
				</li>
				<li>
					<NavLink to="/questions"> Questionnaires</NavLink>
				</li>
				{!session.user_id ? (
					<>
						<li>
							<NavLink to="/login"> Login / Register</NavLink>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/createsurvey"> Create survey</NavLink>
						</li>
						<li>
							<NavLink to="/mysurveys"> My surveys</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLogoutClick} to="/logout">
								Logout
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</div>
	);
}

export default Navbar;
