import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) {
	if (!request.nextUrl.origin.includes('vercel.app')) {
		return NextResponse.next();
	}
	return NextResponse.redirect('https://www.kooked.ch', 301);
}
