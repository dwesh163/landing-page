import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

const contactFormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	message: z.string().min(1, 'Message is required'),
});

export async function POST(req: NextRequest) {
	const body = await req.json();
	const result = contactFormSchema.parse(body);

	const htmlContent = `
        <h1>New Contact Request</h1>
        <p><strong>Name:</strong> ${result.name}</p>
        <p><strong>Email:</strong> ${result.email}</p>
        <p><strong>Message:</strong> ${result.message}</p>
    `;

	const emails = process.env.CONTACT_USERS?.split(',') || [];
	const from = process.env.MAIL_USERNAME || '';

	try {
		await sendEmail(emails, from, 'KOOKED.ch - Contact', htmlContent);
		return NextResponse.json({ message: 'Email sent' });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: 'Validation failed', errors: error.errors }, { status: 400 });
		}
		return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
	}
}

export async function GET() {
	return NextResponse.json({ status: 405, message: 'Method Not Allowed' });
}
