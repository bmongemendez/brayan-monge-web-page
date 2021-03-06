var express = require('express');
var router = express.Router();
const html = require('../utilities/htmlEmailTemplate');

router.post('/', async function (req, res, next) {
	const { name, email, subject, message } = req.body;

	const htmlBody = html.htmlEmailTemplate(name, email, subject, message);

	const sgMail = require('@sendgrid/mail');
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: process.env.EMAIL_DESTINATION, // Change to your recipient
		from: process.env.EMAIL_SENDER, // Change to your verified sender
		subject: subject,
		// text: '',
		html: htmlBody,
	};

	sgMail
		.send(msg)
		.then(() => {
			console.log('Email sent');
			res.json({
				status: 'success',
			});
		})
		.catch((error) => {
			console.error(error);
			res.json({
				status: 'fail',
			});
		});
});

module.exports = router;
