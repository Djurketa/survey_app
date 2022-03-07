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
			<div className="nav-left">
				<img className="logo-img" src={icon} />

				<Link className="logo" to="">
					SurveyApp{" "}
				</Link>
			</div>
			<div className="nav-middle">
				<ul className="menu" theme="dark">
					<li>
						<NavLink to="/"> Home </NavLink>
					</li>
					<li>
						<NavLink to="/surveys"> Surveys</NavLink>
					</li>

					{session.user_id && (
						<li>
							<NavLink to="/createsurvey"> Create survey</NavLink>
						</li>
					)}
					{session.user_id && (
						<li>
							<NavLink to="/mysurveys"> My surveys</NavLink>
						</li>
					)}
				</ul>
			</div>
			<div className="nav-rigth">
				{!session.user_id && (
					<NavLink className="nav-btn" to="/login">
						Login
					</NavLink>
				)}

				{session.user_id && (
					<button className="nav-btn" onClick={handleLogoutClick} to="/logout">
						Logout
					</button>
				)}
			</div>
		</div>
	);
}

export default Navbar;
