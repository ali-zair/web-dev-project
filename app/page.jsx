'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

	// using react router to navigate to home page
	const router = useRouter();

	useEffect(() => {
		router.push('/home.html');
	}, []);

	return null;
}
