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
	console.log("kurcina");
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
			// { question obj
			// 	title: question.title,
			// 	type: question.type,
			// 	survey_id: question.survey_id,
			// }
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

function deleteSurvey(id) {
	return knex("survey").delete().where("survey_id", id);
}

function getAllSurveys(limit) {
	if (limit) {
		return knex("vw_survey").select("*").limit(limit);
	} else {
		return knex("vw_survey").select("*");
	}
}
function getUserSurveys(id) {
	return knex("vw_survey").select("*").where({ user_id: id });
}
function getStats() {
	return {
		totalSurveys: 1000,
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
			"q.type        as  _type",
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
};
