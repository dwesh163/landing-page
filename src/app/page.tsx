import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MoveRight } from 'lucide-react';
import { Project } from '@/types/project';
import fs from 'fs';
import Form from '@/components/form';

export default function Home() {
	const projets: Project[] = JSON.parse(fs.readFileSync('src/data/projects.json', 'utf8'));

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<header className="px-4 lg:px-6 h-14 flex items-center">
				<Link href="/" className="flex items-center justify-center" prefetch={false}>
					<span className="ml-2 text-2xl font-bold">Kooked</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
						Projects
					</Link>
					<Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
						Contact
					</Link>
				</nav>
			</header>
			<main className="flex-1">
				<section className="flex justify-center w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6 space-y-6">
						<div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
							<div className="space-y-4 sm:min-h-96">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">Explore Our Projects</h1>
								<p className="text-muted-foreground md:text-xl">Check out our latest projects and see what we've been working on.</p>
								<Link href="#projects" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" prefetch={false}>
									View Projects
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section id="projects" className="flex justify-center w-full pt-8 py-12 md:pt-20 md:py-24 lg:pt-20 lg:py-32 bg-muted">
					<div className="container px-4 md:px-6">
						<div className="space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Latest Projects</h2>
							<p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Discover some of the exciting projects we have published online</p>
						</div>
						<div className="grid gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{projets.map((projet: Project) => (
								<Card key={projet.id}>
									<div className="p-6 space-y-2">
										<h3 className="text-lg font-semibold">{projet.title}</h3>
										<p className="text-muted-foreground">{projet.description}</p>
										<Link target="_blank" href={projet.link} className="inline-flex items-center text-sm font-medium text-primary hover:underline" prefetch={false}>
											Learn More
											<MoveRight className="mt-1 ml-1 h-4 w-4" />
										</Link>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>
				<section id="contact" className="flex justify-center w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6 space-y-6">
						<div className="space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h2>
							<p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Have a question? Fill out the form below and we'll get back to you.</p>
						</div>
						<Form />
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-muted-foreground">&copy; 2024 Kooked.ch - All rights reserved.</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
						Terms of Service
					</Link>
					<Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}
