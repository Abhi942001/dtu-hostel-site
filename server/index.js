const express = require("express");
const cors = require("cors");
const { query } = require("./mysql");
const { QUERY_TYPES } = require("./shared/constants");

const app = express();
const port = 8081;

app.use(express.json());
app.use(cors());

app.post("/server/login", async (req, res) => {
	const { uname, upass, utype } = req.body.data;

	const authenticatedUser = await query({
		select: "*",
		table: utype === "student" ? "student_account" : "admin_account",
		where:
			utype === "student"
				? `username = "${uname}" and password = "${upass}"`
				: `admin_pass = "${upass}"`,
		type: QUERY_TYPES.SELECT,
	});

	if (authenticatedUser.length > 0) {
		// const reqHostel = await hostelStatus(uname);
		const reqHostel = await query({
			select: "*",
			table: "hostel_status",
			where: `username = "${uname}"`,
			type: QUERY_TYPES.SELECT,
		});
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
	const { user, formData } = req.body.data;

	const result = await genQuery({
		table: "hostel_form",
		values: `"${user}","${formData.name}","${formData.rollno}", "${formData.al1}", "${formData.al2}", "${formData.city}", "${formData.pincode}", 0, "${formData.email}", "${formData.mobile}"`,
		type: QUERY_TYPES.SET,
	});

	res.send(result);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
