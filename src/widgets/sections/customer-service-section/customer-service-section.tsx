'use client'

import { AnimatedButton } from '@/shared/ui/animated-button'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function CustomerServiceSection() {
	return (
		<section className='py-20 px-4 md:px-8 lg:px-16'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-end'>
					{/* Image */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='relative'
					>
						<motion.div
							className='relative overflow-hidden rounded-3xl group'
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.4 }}
						>
							<Image
								src='/images/vintage-car-overhead.png'
								alt='Luxury car aerial view'
								width={600}
								height={600}
								className='object-cover w-full h-[750px] filter grayscale group-hover:grayscale-0 transition-all duration-700'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />

							{/* Floating elements */}
							<motion.div
								className='absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full'
								animate={{
									scale: [1, 1.2, 1],
									opacity: [0.7, 1, 0.7],
								}}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
							/>
							<motion.div
								className='absolute bottom-8 left-8 w-2 h-2 bg-white rounded-full'
								animate={{
									scale: [1, 1.5, 1],
									opacity: [0.5, 1, 0.5],
								}}
								transition={{
									duration: 3,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
									delay: 1,
								}}
							/>
						</motion.div>
					</motion.div>

					{/* Content */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className='space-y-8'
					>
						<motion.h2
							className='text-5xl md:text-6xl font-bold leading-tight'
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<motion.span
								className='inline-block'
								whileHover={{ scale: 1.05, color: '#fbbf24' }}
								transition={{ duration: 0.3 }}
							>
								Superior
							</motion.span>
							<br />
							<motion.span
								className='inline-block'
								whileHover={{ scale: 1.05, color: '#fbbf24' }}
								transition={{ duration: 0.3, delay: 0.1 }}
							>
								Customer
							</motion.span>
							<br />
							<motion.span
								className='inline-block'
								whileHover={{ scale: 1.05, color: '#fbbf24' }}
								transition={{ duration: 0.3, delay: 0.2 }}
							>
								Service
							</motion.span>
						</motion.h2>
						<div className='flex justify-between'>
							

							
							<motion.p
								className='text-[#747474] text-lg leading-relaxed max-w-sm'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 }}
							>
								Experience exotic car rentals from the brand known for
								award-winning customer service. Our goal is to meet your needs
								and exceed your expectations. We&apos;ll even deliver and collect
								your exotic vehicle at your convenience.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.8 }}
							>
								<AnimatedButton>View details</AnimatedButton>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
