const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require("./db/survey");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const config = process.env;
const path = require("path");
const auth = require("./db/middleware/auth");

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,DELETE, PUT");
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token",
		"Origin, X-Requested-With, Content-Type, Accept,Authorization"
	);
	if ("OPTIONS" == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});
app.use(express.static(path.resolve(__dirname, "build")));
app.post("/api/register", async (req, res) => {
	try {
		// Get user input
		const { username, password } = req.body;
		// Validate user input
		if (!(username && password)) {
			return res.status(200).json({ msg: "All input is required." });
		}
		// check if user already exist
		// Validate if user exist in our database
		const [oldUser] = await db.findUser(username);

		// if (oldUser) {
		// 	return res.status(200).json({ msg: "User alredy exist." });
		// }
		//Encrypt user password
		const encryptedPassword = await bcrypt.hash(password, 10);
		// Create user in our database
		const [user_id] = await db.createUser({
			username: username,
			password: encryptedPassword,
		});
		// Create token
		const token = await jwt.sign({ user_id: user_id, username }, "p123", {
			expiresIn: "2h",
		});
		// save user token

		//return new user

		return res.status(200).json({ user_id: user_id, token: token });
	} catch (err) {
		console.log(err);
	}
});

// Login
app.post("/api/login", async (req, res) => {
	try {
		// Get user input
		const { username, password } = req.body.payload;

		// Validate user input
		if (!(username && password)) {
			return res.status(400).json({ msg: "All input is required" });
		}
		// Validate if user exist in our database
		const [user] = await db.findUserPassword(username);
		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = await jwt.sign({ user_id: user.id, username }, "p123", {
				expiresIn: "2h",
			});
			return res
				.status(200)
				.json({ user_id: user.id, username: username, token: token });
		}
		res.status(400).json({ msg: "Invalid Credentials" });
	} catch (err) {
		console.log({ err });
		res.status(400).json({ msg: "Error" });
	}
});

app.post("/api/survey", auth, async (req, res) => {
	if (req.body.payload.survey_id) {
		await db.deleteSurvey(req.body.payload.survey_id);
	}
	const [survey_id] = await db.createSurvey(req.body);
	const prepereQuestions = req.body.payload.questions.map((e) => ({
		title: e.title,
		type: e.type,
		survey_id: survey_id,
	}));
	const options = req.body.payload.questions.map((question) => ({
		options: question.options,
	}));

	const questionIds = await db.createSurvayQuestions(prepereQuestions);

	let resArr = [];
	for (let i = 0; i < options.length; i++) {
		for (let j = 0; j < options[i].options.length; j++) {
			options[i].options[j]["question_id"] = questionIds[i][0];
			resArr.push(options[i].options[j]);
		}
	}
	const prepereAnswers = resArr.map((e) => {
		return { question_id: e.question_id, answer: e.ans };
	});
	await db.createQuestionAnswers(prepereAnswers);

	const [survey] = await db.selectSurvey(survey_id);
	const questions = await db.selectQuestions(survey_id);
	res.status(200).json({ ...survey, questions });
});

app.get("/api/survey/:id", auth, async (req, res) => {
	const survey_id = req.params.id;
	const [survey] = await db.selectSurvey(survey_id);
	const questions = await db.selectQuestions(survey_id);
	console.log();
	res.status(200).json({ ...survey, questions });
});
app.delete("/api/updatesurvey", async (req, res) => {
	const results = await db.updateSurvey(req.body);
	res.status(200).json(results);
});
app.get("/api/surveys", async (req, res) => {
	const surveys = await db.getAllSurveys(req.query.limit);
	res.status(200).json({ surveys });
});
app.get("/api/usersurveys", async (req, res) => {
	const surveys = await db.getUserSurveys(req.query.user_id);
	res.status(200).json({ surveys });
});
app.get("/api/selectSurvey", async (req, res) => {
	console.log(req.query);

	const [survey] = await db.selectSurvey(req.query.id);
	const questions = await db.selectQuestions(req.query.id);
	console.log({ ...survey, questions });
	res.status(200).json({ ...survey, questions });
});
app.get("/api/stats", async (req, res) => {
	const stats = await db.getStats();
	res.status(200).json({ stats });
});
app.post("/api/createSurvayQuestions", async (req, res) => {
	const results = await db.createSurvayQuestions(req.body);
	res.status(201).json({ id: results });
});
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT || 1337, () => {
	console.log("server is running ");
});
