import type { Metadata } from 'next'
import { Archivo} from 'next/font/google'
import '@/app/styles/globals.css'
import Header from '@/widgets/header/header'
import { ThemeProvider } from '../providers/theme-provider'
import { Footer } from '@/widgets/footer/footer'

const ArchivoSans = Archivo({
	variable: '--font-archivo-sans',
	subsets: ['latin'],
})


export const metadata: Metadata = {
	title: 'Carzone - Luxury Car Rental',
	description: 'Carzone - Luxury Car Rental',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`antialiased ${ArchivoSans.className}`}
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
