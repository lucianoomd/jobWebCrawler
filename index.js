const axios = require("axios");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

function sendEmail() {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_FROM,
			pass: process.env.EMAIL_FROM_PW,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: process.env.EMAIL_TO,
		subject: "NEW REACT NATIVE JOB IN AGILE ENGINE",
		text: `There is a new React Native job in Agile Engine: ${process.env.EMAIL_URL_JOBS}`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

function webCrawlJobs() {
	axios
		.get(process.env.URL_JOBS)
		.then((response) => {
			const $ = cheerio.load(response.data);
			const data = $(".awsm-job-post-title").text().split("\n");
			const array = data.filter(
				(item) =>
					item.toLowerCase().includes("react") &&
					item.toLowerCase().includes("native")
			);
			console.log("========== webCrawlJobs ==========");
			console.log("Date: ", new Date());
			if (array.length) {
				sendEmail();
				cron.getTasks().forEach((item) => item.stop);
			}
		})
		.catch((error) => {
			console.error(error);
		});
}

cron.schedule(String(process.env.CRON_EXPRESSION), () => {
	console.log(`Running task with schedule: ${process.env.CRON_EXPRESSION}`);
	webCrawlJobs();
});
