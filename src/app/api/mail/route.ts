import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

// Helper function to escape HTML
const escapeHtml = (unsafe: string) => {
	return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

const contactFormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	message: z.string().min(1, 'Message is required'),
});

export async function POST(req: NextRequest) {
	const body = await req.json();

	try {
		const result = contactFormSchema.parse(body);

		// Sanitize input to prevent script injection
		const sanitizedMessage = escapeHtml(result.message);
		const sanitizedName = escapeHtml(result.name);
		const sanitizedEmail = escapeHtml(result.email);

		const htmlContent = `
      <h1>New Contact Request</h1>
      <p><strong>Name:</strong> ${sanitizedName}</p>
      <p><strong>Email:</strong> ${sanitizedEmail}</p>
      <p><strong>Message:</strong> ${sanitizedMessage}</p>
    `;

		const emails = process.env.CONTACT_USERS?.split(',') || [];
		const from = process.env.MAIL_USERNAME || '';

		await sendEmail(emails, from, 'KOOKED.ch - Contact', htmlContent);

		return NextResponse.json({ message: 'Email sent' });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: 'Validation failed', errors: error.errors }, { status: 400 });
		}

		return NextResponse.json(
			{
				error: 'Failed to send email',
				message: 'An unknown error occurred',
				stack: error instanceof Error ? error.stack : null,
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({ status: 405, message: 'Method Not Allowed' });
}
