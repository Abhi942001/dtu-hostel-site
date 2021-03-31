const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "dbms",
});

const authCheck = async (user) => {
	const { uname: username, upass: password } = user;

	return new Promise((res, rej) => {
		connection.query(
			`select * from student_account where username = "${username}" and password = "${password}"`,
			(err, result) => {
				if (err) rej(err);
				res(result);
			}
		);
	});
};

const hostelStatus = async (user) => {
	return new Promise((res, rej) => {
		connection.query(
			`select * from hostel_status where username = "${user}"`,
			(err, result) => {
				if (err) rej(err);
				res(result);
			}
		);
	});
};

const allotmentFormSubmit = async (userFormData) => {
	const user = userFormData.user;
	const formData = userFormData.formData;
	const query = `insert into hostel_form values ("${user}","${formData.name}","${formData.rollno}", "${formData.al1}", "${formData.al2}", "${formData.city}", "${formData.pincode}", 0, "${formData.email}", "${formData.mobile}")`;

	return new Promise((res, rej) => {
		connection.query(query, (err, result) => {
			if (err) rej(err);
			res(result);
		});
	});
};

module.exports = { authCheck, hostelStatus, allotmentFormSubmit };
