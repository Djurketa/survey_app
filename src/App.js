import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Homepage, Surveys, Survey } from "./components/app";
import "./App.css";
import SurveyEditor from "./components/user/SurveyEditor";
import Login from "./components/user/Login";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./slices/surveySlice";
import UserSurveys from "./components/user/UserSurveys";
import SurveyFill from "./components/user/SurveyFill";
function App() {
	const dispatch = useDispatch();

	dispatch(setSession(JSON.parse(sessionStorage.getItem("session"))));
	// const session = useSelector((state) => state.survey.session);
	// console.log("APP", session);

	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<div className="header">
					<div className="routes">
						<Routes>
							<Route exact path="/" element={<Homepage />}></Route>
							<Route
								exact
								path="/surveys"
								element={<Surveys simplified={false} />}></Route>

							<Route
								exact
								path="/survey/:survey_id"
								element={<SurveyFill />}></Route>

							<Route exact path="/mysurveys" element={<UserSurveys />}></Route>

							<Route
								exact
								path="/createsurvey"
								element={<SurveyEditor />}></Route>
							<Route exact path="/login" element={<Login />}></Route>
						</Routes>
					</div>
				</div>

				<div className="footer">
					<h3>
						SurveyApp All rights reserved
						<br />
						<div>
							<Link to="/">Home</Link>
							<Link to="/">Home</Link>
							<Link to="/">Home</Link>
						</div>
					</h3>
				</div>
			</div>
		</div>
	);
}

export default App;
