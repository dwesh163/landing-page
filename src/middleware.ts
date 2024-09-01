import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
	if (!request.nextUrl.origin.includes('vercel.app')) {
		return NextResponse.next();
	}

	const redirectUrl = new URL(process.env.MAIN_URL || '');
	return NextResponse.redirect(redirectUrl, 301);
}
