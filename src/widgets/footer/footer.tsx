'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { AnimatedButton } from '@/shared/ui/animated-button'
import { SocialIcons } from '@/shared/ui/social-icons'
import { FOOTER_LINKS, SOCIAL_ICONS } from '../sections/brands-section/data'
import Link from 'next/link'

export function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<footer className=' backdrop-blur-sm border-t border-gray-800 py-16 px-4 md:px-8 lg:px-16'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
					{/* Brand Section */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='lg:col-span-2'
					>
						<div className='flex items-center gap-1 mb-6'>
							<motion.div
								className='w-8 h-8 bg-white flex items-center justify-center rounded'
								whileHover={{ rotate: 360, scale: 1.1 }}
								transition={{ duration: 0.6 }}
							>
								<span className='text-black font-bold text-xl'>C</span>
							</motion.div>
							<motion.span
								className='text-2xl font-bold'
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3 }}
							>
								ARZONE
							</motion.span>
						</div>

						<motion.p
							className='text-[#747474] mb-8 max-w-md leading-relaxed'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Every tap of the accelerator is a gut punch. It&apos;s a special
							engine, a little talisman against boredom and the indignities of
							daily life.
						</motion.p>

						<AnimatedButton variant='outline'>
							Contact Us
							<ArrowRight className='ml-2 h-4 w-4' />
						</AnimatedButton>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='space-y-6'
					>
						<div>
							<h3 className='text-[#747474] text-sm font-medium mb-3'>
								Address
							</h3>
							<motion.p
								className='text-white hover:text-yellow-400 transition-colors duration-300 cursor-pointer'
								whileHover={{ scale: 1.02 }}
							>
								224 W 79th St, New York, NY 10024, USA
							</motion.p>
						</div>

						<div>
							<h3 className='text-[#747474]0 text-sm font-medium mb-3'>
								Contact Us
							</h3>
							<motion.p
								className='text-white mb-1 hover:text-yellow-400 transition-colors duration-300 cursor-pointer'
								whileHover={{ scale: 1.02 }}
							>
								+62 9384 3478
							</motion.p>
							<motion.p
								className='text-white hover:text-yellow-400 transition-colors duration-300 cursor-pointer'
								whileHover={{ scale: 1.02 }}
							>
								carzone@gmail.com
							</motion.p>
						</div>
					</motion.div>

					{/* Back to Top & Social */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='flex flex-col items-end space-y-6'
					>
						<motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>
							<AnimatedButton
								variant='outline'
								size='icon'
								className='w-12 h-12'
								onClick={scrollToTop}
							>
								<ArrowUp className='h-5 w-5' />
							</AnimatedButton>
						</motion.div>

						<SocialIcons icons={SOCIAL_ICONS} />
					</motion.div>
				</div>

				{/* Footer Links */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className='flex flex-wrap gap-8 mb-8 pb-8 border-b border-gray-800'
				>
					{FOOTER_LINKS.map((link) => (
						<Link
							key={link[1]}
							href={link[1]}
							className='text-[#747474] hover:text-white transition-colors duration-300'
						>
							{link[0]}
						</Link>
					))}
				</motion.div>

				{/* Copyright */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 1 }}
					className='flex flex-col md:flex-row justify-between items-center gap-4'
				>
					<div className='flex gap-8'>
						<motion.a
							href='#'
							className='text-[#747474] hover:text-white transition-colors duration-300'
							whileHover={{ scale: 1.05 }}
						>
							Terms & Conditions
						</motion.a>
					</div>

					<p className='text-[#747474] text-sm'>
						© 2025 Carzone, Inc. All Rights Reserved
					</p>

					<motion.a
						href='#'
						className='text-[#747474] hover:text-white transition-colors duration-300'
						whileHover={{ scale: 1.05 }}
					>
						Cookies Policy
					</motion.a>
				</motion.div>
			</div>
		</footer>
	)
}
