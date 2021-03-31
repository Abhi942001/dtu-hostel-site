const express = require("express");
const cors = require("cors");
const { authCheck, hostelStatus, allotmentFormSubmit } = require("./mysql");

const app = express();
const port = 8081;

app.use(express.json());
app.use(cors());

app.post("/server/login", async (req, res) => {
	const { uname, upass } = req.body.data;
	const authenticatedUser = await authCheck({ uname, upass });
	if (authenticatedUser.length > 0) {
		const reqHostel = await hostelStatus(uname);
		console.log(reqHostel);
		res.send(
			reqHostel.length > 0
				? { uname, hostelStatus: reqHostel[0] }
				: { uname, hostelStatus: null }
		);
	} else {
		res.send(null);
	}

	// res.send(authenticatedUser.length > 0 ? uname : null);
});

app.post("/server/form/submit", async (req, res) => {
	const userFormData = req.body.data;

	const result = allotmentFormSubmit(userFormData);

	res.send(result);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
