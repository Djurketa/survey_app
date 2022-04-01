import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Homepage, Surveys } from "./components/app";
import "./App.css";
import SurveyEditor from "./components/user/SurveyEditor";
import Login from "./components/user/Login";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./slices/surveySlice";
import UserSurveys from "./components/user/UserSurveys";
import SurveyFill from "./components/user/SurveyFill";
import Message from "./components/user/Message";

function App() {
	const dispatch = useDispatch();

	const msg = useSelector((state) => state.survey.msg);

	dispatch(setSession(JSON.parse(sessionStorage.getItem("session"))));

	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
				{msg && <Message className="error" msg={msg} />}
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
								element={<SurveyEditor newSurvey={true} />}></Route>
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
