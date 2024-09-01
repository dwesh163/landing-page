'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z, ZodError } from 'zod';

const contactFormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof contactFormSchema>;
type FormErrors = Partial<Record<keyof FormData, string>> & { form?: string };

export default function Form() {
	const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
	const [errors, setErrors] = useState<FormErrors>({});
	const [successMessage, setSuccessMessage] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setErrors({});
		setSuccessMessage('');

		try {
			contactFormSchema.parse(formData);

			const response = await fetch('/api/mail', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.log(errorData);
				throw new Error(errorData.message || 'Failed to submit form');
			}

			setSuccessMessage('Contact form submitted successfully!');
			setFormData({ name: '', email: '', message: '' });
			setTimeout(() => setSuccessMessage(''), 5000);
		} catch (error) {
			if (error instanceof ZodError) {
				const formattedErrors: FormErrors = error.errors.reduce((acc, curr) => {
					acc[curr.path[0] as keyof FormData] = curr.message;
					return acc;
				}, {} as FormErrors);
				setErrors(formattedErrors);
			} else if (error instanceof Error) {
				setErrors({ form: error.message });
			}
		}
	};

	return (
		<form className="mx-auto max-w-md space-y-4" onSubmit={handleSubmit}>
			<div className="grid gap-2">
				<Label htmlFor="name">Name</Label>
				<Input id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
				{errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
				{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="message">Message</Label>
				<Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" value={formData.message} onChange={handleChange} />
				{errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
			</div>
			{errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
			{successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
			<Button type="submit" className="w-full">
				Submit
			</Button>
		</form>
	);
}
