import React, { useRef } from "react";
import icon from "../../images/logo3.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSession } from "../../slices/surveySlice";
import { HiOutlineDotsVertical } from "react-icons/hi";
function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const session = useSelector((state) => state.survey.session);
	const list = useRef(null);

	function handleLogoutClick() {
		dispatch(setSession({}));
		navigate("/");
	}
	function handleMenuClick() {
		list.current.classList.toggle("df");
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
				<ul className="menu" ref={list}>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/surveys"> Surveys</NavLink>
					</li>

					{session.user_id && (
						<li>
							<NavLink to="/createsurvey">Create survey</NavLink>
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
					<NavLink className="nav-btn login-btn" to="/login">
						Login
					</NavLink>
				)}

				{session.user_id && (
					<>
						<button
							className="nav-btn logout-btn"
							onClick={handleLogoutClick}
							to="/logout">
							Logout
						</button>
					</>
				)}
				<button className="menu-btn" onClick={handleMenuClick}>
					<HiOutlineDotsVertical className="menu-img" />
				</button>
			</div>
		</div>
	);
}

export default Navbar;
