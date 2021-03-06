const knex = require("./knex");
var knexnest = require("knexnest");

knex.raw("PRAGMA foreign_keys = ON;").then(() => {
	console.log("Foreign Key Check activated.");
});

function findUser(username) {
	return knex("users").select("id").where("username", username);
}
function findUserPassword(username) {
	return knex("users").select("id", "password").where("username", username);
}
function createUser(user) {
	return knex("users").insert(user);
}

function createSurvey(survey) {
	return knex("survey").insert({
		title: survey.payload.title,
		desc: survey.payload.description,
		user_created: survey.payload.session.user_id,
		date_created: Date.now(),
		category_id: survey.payload.category_id,
		status: 1,
	});
}

function createSurvayQuestions(questions) {
	return knex.transaction((trx) => {
		const queries = [];
		questions.forEach((question) => {
			const query = knex("survey_questions").insert(question).transacting(trx); // This makes every update be in the same transaction
			queries.push(query);
		});
		Promise.all(queries) // Once every query is written
			.then(trx.commit) // We try to execute all of them
			.catch(trx.rollback); // And rollback in case any of them goes wrong
	});
}
function createQuestionAnswers(answers) {
	return knex("question_answers").insert(answers);
}
function insertSurveyResults(answers) {
	const prepared = answers.payload.map((answer) => {
		return {
			question_id: answer.question_id,
			answer_id: answer.answer_id,
			question_type: answer.type,
			value: answer.value,
		};
	});
	return knex("survey_results").insert(prepared);
}
function deleteSurvey(id) {
	return knex("survey").delete().where("survey_id", id);
}

function getAllSurveys() {
	return knex("vw_survey").select("*").orderBy("date_created", "desc");
}
function getUserSurveys(id) {
	return knex("vw_survey").select("*").where({ user_id: id });
}
function getStats() {
	return {
		totalSurveys: 1001,
		totalQuestions: 200,
		totalResearchs: 1200,
		totalClosedSurveys: 400,
		totalClosetQuestions: 100,
		totalActiveQuestions: 200,
		totalClosedSurevys: 400,
	};
}
function selectSurvey(id) {
	return knex("survey").where({
		survey_id: id,
	});
}
function selectQuestions(id) {
	// return knex("survey_questions").where({ "survey_id": id }).groupBy('question');
	var sql = knex
		.select(
			"q.id           as _id",
			"q.title        as _title",
			"q.type         as _type",
			"qa.answer_id   as _options__id",
			"qa.answer      as _options__ans"
		)
		.from("survey_questions AS q ")

		.leftJoin("question_answers AS qa", "qa.question_id", "q.id")
		.where("q.survey_id", "=", id)
		.orderBy("q.id", "asc");
	return knexnest(sql).then(function (data) {
		return data;
	});
}
function getSurveyResult(id) {
	return knex("vw_results").where({ survey_id: id });
}

module.exports = {
	findUser,
	findUserPassword,
	createUser,
	createSurvey,
	getAllSurveys,
	getStats,
	createSurvayQuestions,
	deleteSurvey,
	createQuestionAnswers,
	selectSurvey,
	selectQuestions,
	getUserSurveys,
	insertSurveyResults,
	getSurveyResult,
};
