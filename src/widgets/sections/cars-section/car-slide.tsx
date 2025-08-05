'use client'

import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/shared/ui/button'
import { Settings, Zap, Calendar, DollarSign } from 'lucide-react'
import { Suspense, memo, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import CarModel from './car-model'
import { CarData } from '@/entities/cars/data/car'
import { ErrorBoundary } from './error-boundary'
import { LoadingSpinner } from './loading-spinner'

interface CarSlideProps {
	car: CarData
	isActive: boolean
	prevCar?: CarData
	nextCar?: CarData
	onOpenModal: (type: 'rent' | 'buy' | 'details') => void
}

const CarSlide = memo<CarSlideProps>(
	({ car, isActive, prevCar, nextCar, onOpenModal }) => {
		// Memoize background style for performance
		const backgroundStyle = useMemo(
			() => ({
				background: `
      radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.95) 70%, rgba(0,0,0,1) 100%),
      linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.02) 49.5%, rgba(255,255,255,0.02) 50.5%, transparent 51%),
      linear-gradient(-45deg, transparent 49%, rgba(255,255,255,0.02) 49.5%, rgba(255,255,255,0.02) 50.5%, transparent 51%)
    `,
				backgroundSize: '100% 100%, 20px 20px, 20px 20px',
			}),
			[]
		)

		// Memoize animation variants
		const slideVariants = useMemo(
			() => ({
				initial: { opacity: 0, scale: 0.95 },
				animate: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 1.05 },
				transition: { duration: 0.6, ease: 'easeInOut' },
			}),
			[]
		)

		// Memoize click handlers
		const handleRentClick = useCallback(() => {
			onOpenModal('rent')
		}, [onOpenModal])

		const handleBuyClick = useCallback(() => {
			onOpenModal('buy')
		}, [onOpenModal])

		const handleViewDetailsClick = useCallback(() => {
			onOpenModal('details')
		}, [onOpenModal])

		// Memoize Canvas settings
		const canvasSettings = useMemo(
			() => ({
				camera: { position: [6, 3, 6] as [number, number, number], fov: 45 },
				shadows: true,
				gl: {
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance' as const,
					stencil: false,
					depth: true,
				},
				dpr: [1, 2] as [number, number],
				performance: { min: 0.5 },
			}),
			[]
		)

		const onCanvasCreated = useCallback(
			({ gl }: { gl: THREE.WebGLRenderer }) => {
				gl.setClearColor('#000000', 0)
				gl.outputColorSpace = THREE.SRGBColorSpace
				gl.toneMapping = THREE.ACESFilmicToneMapping
				gl.toneMappingExposure = 1.2
			},
			[]
		)

		return (
			<motion.div
				className='relative w-full h-screen flex items-center justify-center overflow-hidden'
				initial='initial'
				animate='animate'
				exit='exit'
				variants={slideVariants}
				style={backgroundStyle}
			>
				{/* Background Brand Text */}
				<motion.div
					className='absolute inset-0 flex items-center justify-center pointer-events-none z-0'
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 0.08 }}
					transition={{ duration: 1, delay: 0.2 }}
				>
					<h1
						className='text-[18vw] md:text-[22vw] font-black tracking-wider select-none will-change-transform'
						style={{
							color: car.brandColor,
							fontFamily: 'Arial Black, sans-serif',
							textShadow: '0 0 100px rgba(255,255,255,0.1)',
						}}
					>
						{car.brand}
					</h1>
				</motion.div>

				{/* Left Content */}
				<motion.div
					className='absolute left-4 md:left-16 top-1/4 z-10 max-w-xs md:max-w-sm'
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.3 }}
				>
					{/* Yellow accent line */}
					<motion.div
						className='w-12 md:w-16 h-0.5 bg-yellow-400 mb-3 md:mb-4'
						initial={{ width: 0 }}
						animate={{ width: '4rem' }}
						transition={{ duration: 0.6, delay: 0.5 }}
					/>

					<motion.p
						className='text-white text-base md:text-lg font-light tracking-[0.2em] mb-4 md:mb-6'
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						ARRIVE IN STYLE
					</motion.p>

					<motion.p
						className='text-gray-400 text-xs md:text-sm leading-relaxed'
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						Choose from our prestigious collection of world-class brands:
					</motion.p>

					{/* Category Badge */}
					<motion.div
						className='mt-4'
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.7 }}
					>
						<span className='inline-block px-3 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full border border-yellow-400/30'>
							{car.category}
						</span>
					</motion.div>
				</motion.div>

				{/* Type Label - Left Bottom */}
				<motion.div
					className='absolute left-4 md:left-16 bottom-1/3 z-10'
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<p className='text-gray-500 text-base md:text-lg font-light tracking-wider'>
						{car.typeLabel}
					</p>
				</motion.div>

				{/* Right Top Content */}
				<motion.div
					className='absolute right-4 md:right-16 top-8 md:top-16 z-10'
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					{/* Brand Logo */}
					<div className='flex flex-col items-end gap-4 md:gap-6'>
						<div className='text-white text-sm font-light tracking-wider mb-2 md:mb-4'>
							<svg
								width='50'
								height='25'
								viewBox='0 0 60 30'
								fill='currentColor'
								className='opacity-80 md:w-[60px] md:h-[30px]'
							>
								<path d='M15 5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S20.5 5 15 5zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z' />
								<path d='M45 5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S50.5 5 45 5zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z' />
								<path d='M30 2L25 15L35 15z' />
							</svg>
						</div>

						<div className='flex flex-col gap-2 md:gap-3'>
							<Button
								variant='outline'
								onClick={handleRentClick}
								className='bg-transparent border-gray-600 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm'
							>
								Rent a car
							</Button>
							<Button
								onClick={handleBuyClick}
								className='bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-medium'
							>
								Buy a car
							</Button>
						</div>
					</div>
				</motion.div>

				{/* Side Cars Preview */}
				<AnimatePresence>
					{prevCar && (
						<motion.div
							key={`prev-${prevCar.id}`}
							className='absolute left-0 top-1/2 transform -translate-y-1/2 z-5 opacity-30'
							initial={{ x: -200, opacity: 0 }}
							animate={{
								x: isActive ? -80 : -200,
								opacity: isActive ? 0.3 : 0,
							}}
							exit={{ x: -200, opacity: 0 }}
							transition={{ duration: 1, delay: 0.3 }}
						>
							<div className='w-24 md:w-32 h-16 md:h-20 bg-gray-800/50 rounded-lg flex items-center justify-center backdrop-blur-sm'>
								<div
									className='w-16 md:w-20 h-10 md:h-12 rounded'
									style={{ backgroundColor: prevCar.color }}
								/>
							</div>
						</motion.div>
					)}

					{nextCar && (
						<motion.div
							key={`prev-${nextCar.id}`}
							className='absolute right-0 top-1/2 transform -translate-y-1/2 z-5 opacity-30'
							initial={{ x: 200, opacity: 0 }}
							animate={{ x: isActive ? 80 : 200, opacity: isActive ? 0.3 : 0 }}
							exit={{ x: 200, opacity: 0 }}
							transition={{ duration: 1, delay: 0.3 }}
						>
							<div className='w-24 md:w-32 h-16 md:h-20 bg-gray-800/50 rounded-lg flex items-center justify-center backdrop-blur-sm'>
								<div
									className='w-16 md:w-20 h-10 md:h-12 rounded'
									style={{ backgroundColor: nextCar.color }}
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* 3D Car Model with Platform */}
				<motion.div
					className='absolute inset-0 z-5 flex items-center justify-center'
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
					transition={{ duration: 1, delay: 0.2 }}
				>
					{/* Circular Platform */}
					<div className='absolute bottom-1/4 w-80 md:w-96 h-3 md:h-4 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent rounded-full blur-sm' />
					<div className='absolute bottom-1/4 w-64 md:w-80 h-1.5 md:h-2 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent rounded-full' />

					<div className='w-full h-full'>
						<ErrorBoundary>
							<Suspense fallback={<LoadingSpinner />}>
								<Canvas {...canvasSettings} onCreated={onCanvasCreated}>
									<CarModel carData={car} isActive={isActive} />
								</Canvas>
							</Suspense>
						</ErrorBoundary>
					</div>
				</motion.div>

				{/* Bottom Info */}
				<motion.div
					className='absolute bottom-4 md:bottom-16 left-4 md:left-16 right-4 md:right-16 z-10'
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.5 }}
				>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-end'>
						<div className='mb-4 md:mb-0 max-w-md'>
							<h2 className='text-white text-2xl md:text-4xl font-bold mb-2 md:mb-3 tracking-wide'>
								{car.fullName}
							</h2>
							<p className='text-gray-400 text-xs md:text-sm leading-relaxed mb-2'>
								{car.description}
							</p>
							<div className='flex items-center gap-2'>
								<DollarSign className='w-4 h-4 text-yellow-400' />
								<span className='text-yellow-400 font-semibold text-sm md:text-base'>
									{car.price}
								</span>
							</div>
						</div>

						<div className='flex flex-col items-start md:items-end gap-4 md:gap-6'>
							<div className='flex gap-6 md:gap-12'>
								<div className='flex flex-col items-center text-white'>
									<Settings className='w-4 md:w-5 h-4 md:h-5 text-gray-400 mb-1 md:mb-2' />
									<p className='text-[10px] md:text-xs text-gray-500 tracking-wider'>
										MILEAGE
									</p>
									<p className='text-sm md:text-lg font-bold'>{car.mileage}</p>
								</div>

								<div className='flex flex-col items-center text-white'>
									<Zap className='w-4 md:w-5 h-4 md:h-5 text-gray-400 mb-1 md:mb-2' />
									<p className='text-[10px] md:text-xs text-gray-500 tracking-wider'>
										KM/H
									</p>
									<p className='text-sm md:text-lg font-bold'>{car.maxSpeed}</p>
								</div>

								<div className='flex flex-col items-center text-white'>
									<Calendar className='w-4 md:w-5 h-4 md:h-5 text-gray-400 mb-1 md:mb-2' />
									<p className='text-[10px] md:text-xs text-gray-500 tracking-wider'>
										YEAR
									</p>
									<p className='text-sm md:text-lg font-bold'>{car.year}</p>
								</div>
							</div>

							<Button
								onClick={handleViewDetailsClick}
								className='bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 px-6 md:px-8 py-1.5 md:py-2 text-xs md:text-sm font-medium'
							>
								View details
							</Button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		)
	}
)

CarSlide.displayName = 'CarSlide'

export default CarSlide
