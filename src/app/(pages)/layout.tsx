import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/styles/globals.css'
import Header from '@/widgets/header/header'
import { ThemeProvider } from '../providers/theme-provider'
import { Footer } from '@/widgets/footer/footer'

// const geistSans = Geist({
// 	variable: '--font-geist-sans',
// 	subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
// 	variable: '--font-geist-mono',
// 	subsets: ['latin'],
// })
// `${geistSans.variable} ${geistMono.variable} 
export const metadata: Metadata = {
	title: 'Karzone - Luxury Car Rental',
	description: 'Karzone - Luxury Car Rental',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
						<Header />
					<main>{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
