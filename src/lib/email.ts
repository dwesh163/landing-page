import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

export async function sendEmail(email: string, from: string, subject: string, htmlContent: string): Promise<void> {
	const secret = {
		user: process.env.MAIL_USERNAME || '',
		pass: process.env.MAIL_PASSWORD || '',
		from: from,
		subject: subject,
	};

	const transporter: Transporter = nodemailer.createTransport({
		host: 'mail.infomaniak.com',
		port: 465,
		secure: true,
		auth: {
			user: secret.user,
			pass: secret.pass,
		},
	});

	const mailOptions: SendMailOptions = {
		from: secret.user,
		to: email,
		subject: secret.subject,
		html: htmlContent,
	};

	transporter.sendMail(mailOptions, (error: Error | null) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('E-mail sent');
		}
	});
}
