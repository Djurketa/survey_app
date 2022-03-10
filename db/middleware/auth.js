const jwt = require("jsonwebtoken");

// const config = process.env;

const verifyToken = (req, res, next) => {
	const token =
		req.body.payload?.session.token ||
		req.query.token ||
		req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		// todo add enf file config.TOKEN_KEY
		const decoded = jwt.verify(token, "p123");
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

module.exports = verifyToken;
