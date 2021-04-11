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
		type: QUERY_TYPES.SELECT,
		select: "*",
		table: utype === "student" ? "student_account" : "admin_account",
		where:
			utype === "student"
				? `username = "${uname}" and password = "${upass}"`
				: `admin_pass = "${upass}"`,
	});

	if (authenticatedUser.length > 0) {
		// const reqHostel = await hostelStatus(uname);
		const reqHostel = await query({
			type: QUERY_TYPES.SELECT,
			select: "*",
			table: "hostel_status",
			where: `username = "${uname}"`,
		});

		res.send(
			reqHostel.length > 0
				? { uname, hostelStatus: reqHostel[0] }
				: { uname, hostelStatus: null }
		);
	} else {
		res.send(null);
	}
});

app.get("/server/hostel-status", async (req, res) => {
	const { username } = req.query;
	await query({
		type: QUERY_TYPES.SELECT,
		table: "hostel_status",
		where: `username = "${username}"`
	}).then(result => res.send(result[0])).catch(e => res.send("ERROR"))
})

app.post("/server/form/submit", async (req, res) => {
	const { user, formData } = req.body.data;

	const result = await query({
		table: "hostel_form",
		values: `"${user}","${formData.name}","${formData.rollno}", "${formData.al1}", "${formData.al2}", "${formData.city}", "${formData.pincode}", 0, "${formData.email}", "${formData.mobile}"`,
		type: QUERY_TYPES.SET,
	});

	res.send(result);
});

app.get("/server/admin/hostel/unalloted", async (req, res) => {
	const data = JSON.parse(req.query.user);
	if (data.userType !== "admin") {
		res.send(null);
	} else {
		const result = await query({
			type: QUERY_TYPES.SELECT,
			table: "hostel_form, hostel_status",
			where:
				"hostel_form.username = hostel_status.username",
		});

		res.send(result);
	}
});

app.get("/server/admin/hostels", async (req, res) => {
	await query({
		type: QUERY_TYPES.SELECT,
		table: "hostel_occupancy",
	})
		.then((result) => {
			res.send(result);
		})
		.catch((e) => {
			res.send(e.sqlMessage);
		});
});

app.get("/server/admin/hostel", async (req, res) => {
	const { room_id } = req.query;
	await query({
		type: QUERY_TYPES.SELECT,
		table: "hostel_occupancy",
		where: `room_id = ${room_id}`
	})
		.then((result) => {
			res.send(result);
		})
		.catch((e) => {
			res.send(e.sqlMessage);
		});
});

app.get("/server/admin/hostel/students", async (req, res) => {
	await query({
		type: QUERY_TYPES.SELECT,
		table: `student_account`,
		select: `username`
	}).then((result) => {
		const studentUsernames = result.map(e => e.username);
		res.send(studentUsernames);
	}).catch((e) => {
		res.send(e.sqlMessage);
	});
});

app.post("/server/admin/hostel", async (req, res) => {
	const { room_id, occupant1, occupant2 } = req.body.data;
	await query({
		type: QUERY_TYPES.UPDATE,
		values: `occupant1 = "${occupant1}" ${occupant2 ? `, occupant2 = "${occupant2}"` : ""
			}`,
		table: `hostel_occupancy`,
		where: `room_id = ${room_id}`,
	})
	await query({
		type: QUERY_TYPES.UPDATE,
		values: `is_alloted = 1`,
		table: `hostel_status`,
		where: `username = "${occupant1}"`,
	})

	if (occupant2) {
		await query({
			type: QUERY_TYPES.UPDATE,
			values: `is_alloted = 1`,
			table: `hostel_status`,
			where: `username = "${occupant2}"`,
		})
	}
	res.send("ok");
});


app.post("/server/admin/reject", async (req, res) => {
	const { username } = req.body.data;
	await query({
		type: QUERY_TYPES.UPDATE,
		values: `req_rejected = 1`,
		table: `hostel_status`,
		where: `username = "${username}"`,
	});

	res.send("ok");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
