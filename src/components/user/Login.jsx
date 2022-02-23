import React from "react";
import icon from "../../images/logo3.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginSurveysAsync } from "../../slices/surveySlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { useSessionStorage } from "../../app/useSessionStorage";
function Login() {
	const user_id = useSelector((state) => state.survey.user_id);
	const [username, setUsername] = useState();
	const dispatch = useDispatch();
	const [token, setToken] = useState(sessionStorage.getItem("token"));
	useEffect(() => {
		setToken(token);
	}, []);
	function handleLoginClick(e) {
		dispatch(LoginSurveysAsync({ username: "Jovan", password: "123" }));
	}

	return (
		<div className="login-wrapper">
			{token}
			{token ? <Navigate to="/createsurvey" /> : ""}

			<div className="logo-login-wrapper">
				<div className="logo-container">
					<img className="logo-img" src={icon} />

					<Link className="logo" to="home">
						{" "}
						SurveyApp{" "}
					</Link>
				</div>
				<div>Sign in to create survey</div>
			</div>
			<div className="form-group ">
				<label htmlFor="username">Username</label>
				<input type="text" />
				<label htmlFor="password">Password</label>
				<input type="password" />
				<button onClick={handleLoginClick} className="editor-btns save">
					Login
				</button>
			</div>
		</div>
	);
}

export default Login;
