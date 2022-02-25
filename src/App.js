import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
	Navbar,
	Homepage,
	Surveys,
	Survey,
	Questionnaire,
	Questionnaires,
} from "./components/app";
import "./App.css";
import SurveyEditor from "./components/user/SurveyEditor";
import Login from "./components/user/Login";
import { useDispatch } from "react-redux";
import { setSession } from "./slices/surveySlice";
import UserSurveys from "./components/user/UserSurveys";

function App() {
	const dispatch = useDispatch();

	dispatch(setSession(JSON.parse(sessionStorage.getItem("session"))));

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
								path="/questions"
								element={<Questionnaires />}></Route>
							<Route exact path="/survey/:id" element={<Survey />}></Route>
							<Route
								exact
								path="/question/:id"
								element={<Questionnaire />}></Route>
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
					<h3 level={5} style={{ color: "white", textAlign: "center" }}>
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
