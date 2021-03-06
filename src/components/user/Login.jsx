import React from "react";
import icon from "../../images/logo3.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginSurveysAsync } from "../../slices/surveySlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useState } from "react";

function Login() {
	const survey = useSelector((state) => state.survey);

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();

	function handleLoginClick(e) {
		dispatch(LoginSurveysAsync({ username: username, password: password }));
	}

	return (
		<>
			<div className="login-wrapper">
				{survey.session.user_id ? <Navigate to="/createsurvey" /> : ""}
				<div className="logo-login-wrapper">
					<div className="logo-container">
						<img className="logo-img" src={icon} />

						<Link className="logo" to="home">
							SurveyApp{" "}
						</Link>
					</div>
					<div>Sign in to create survey</div>
				</div>
				<div className="form-group ">
					<label htmlFor="username">Username</label>
					<input
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						type="text"
					/>
					<label htmlFor="password">Password</label>
					<input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type="password"
					/>
				</div>
				<div className="form-group">
					<button onClick={handleLoginClick} className="btn btn-primary">
						Login
					</button>
				</div>
			</div>
		</>
	);
}

export default Login;
