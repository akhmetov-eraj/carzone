'use client'

import type React from 'react'

import { carsData } from '@/entities/cars/data/cars'
import { useCarFilter } from '@/shared/hooks/use-car-filter'
import { useKeyboardShortcuts } from '@/shared/hooks/use-keyboard-shortcuts'
import { useModal } from '@/shared/hooks/use-modal'
import { usePreloadImages } from '@/shared/hooks/use-preload-images'
import { Button } from '@/shared/ui/button'
import { BuyCarModal } from '@/widgets/modals/buy-car-modal'
import { CarDetailsModal } from '@/widgets/modals/car-details-modal'
import { RentCarModal } from '@/widgets/modals/rent-car-modal'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ChevronLeft,
	ChevronRight,
	Filter,
	Grid3X3,
	Pause,
	Play,
} from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { CarCounter } from './car-counter'
import { CarFilter } from './car-filter'
import CarSlide from './car-slide'
import { CarThumbnails } from './car-thumbnails'
import { PerformanceMonitor } from './performance-monitor'

const CarsSection = memo(() => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isAutoPlaying, setIsAutoPlaying] = useState(true)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [showFilter, setShowFilter] = useState(false)
	const [showThumbnails, setShowThumbnails] = useState(false)
	const [showUI] = useState(true)
	// setShowUI
	// const [showPerformance, setShowPerformance] = useState(false)

	// Car filtering
	const { selectedCategory, setSelectedCategory, filteredCars } = useCarFilter()

	// Preload car images for better performance
	const carImages = useMemo(
		() => carsData.map(() => `images/futuristic-sports-car.png`),
		[]
	)
	const { isLoading } = usePreloadImages(carImages)

	// Use filtered cars or all cars
	const displayCars = filteredCars.length > 0 ? filteredCars : carsData

	// Memoize current car data
	const currentCar = useMemo(
		() => displayCars[currentSlide],
		[displayCars, currentSlide]
	)
	const prevCar = useMemo(() => {
		const prevIndex =
			(currentSlide - 1 + displayCars.length) % displayCars.length
		return displayCars[prevIndex]
	}, [currentSlide, displayCars])
	const nextCar = useMemo(() => {
		const nextIndex = (currentSlide + 1) % displayCars.length
		return displayCars[nextIndex]
	}, [currentSlide, displayCars])

	// Reset slide when filter changes
	useEffect(() => {
		setCurrentSlide(0)
	}, [selectedCategory])

	// Optimized slide change function with preloading
	const changeSlide = useCallback(
		(newIndex: number) => {
			if (
				isTransitioning ||
				newIndex < 0 ||
				newIndex >= displayCars.length ||
				!displayCars[newIndex]
			)
				return

			setIsTransitioning(true)
			setCurrentSlide(newIndex)
			setIsAutoPlaying(false)

			// Preload next models
			// const nextModelIndex = (newIndex + 1) % displayCars.length
			// const prevModelIndex =
			// 	(newIndex - 1 + displayCars.length) % displayCars.length

			// Reset transition state after animation
			setTimeout(() => setIsTransitioning(false), 600)
		},
		[isTransitioning, displayCars]
	)

	// Auto-play functionality with cleanup
	useEffect(() => {
		if (!isAutoPlaying || isLoading || displayCars.length === 0) return

		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % displayCars.length)
		}, 15000) // Longer interval for GLB loading

		return () => clearInterval(interval)
	}, [isAutoPlaying, isLoading, displayCars.length])

	const nextSlide = useCallback(() => {
		const newIndex = (currentSlide + 1) % displayCars.length
		changeSlide(newIndex)
	}, [currentSlide, displayCars.length, changeSlide])

	const prevSlide = useCallback(() => {
		const newIndex =
			(currentSlide - 1 + displayCars.length) % displayCars.length
		changeSlide(newIndex)
	}, [currentSlide, displayCars.length, changeSlide])

	const goToSlide = useCallback(
		(index: number) => {
			changeSlide(index)
		},
		[changeSlide]
	)

	const toggleAutoplay = useCallback(() => {
		setIsAutoPlaying(prev => !prev)
	}, [])

	// Keyboard shortcuts
	useKeyboardShortcuts({
		onPrevious: prevSlide,
		onNext: nextSlide,
		onToggleAutoplay: toggleAutoplay,
		onGoToSlide: goToSlide,
		isTransitioning,
		totalSlides: displayCars.length,
	})

	// Optimized touch handling
	const [touchStart, setTouchStart] = useState<number | null>(null)
	const [touchEnd, setTouchEnd] = useState<number | null>(null)

	const minSwipeDistance = 50

	const onTouchStart = useCallback((e: React.TouchEvent) => {
		setTouchEnd(null)
		setTouchStart(e.targetTouches[0].clientX)
	}, [])

	const onTouchMove = useCallback((e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX)
	}, [])

	const onTouchEnd = useCallback(() => {
		if (!touchStart || !touchEnd || isTransitioning) return

		const distance = touchStart - touchEnd
		const isLeftSwipe = distance > minSwipeDistance
		const isRightSwipe = distance < -minSwipeDistance

		if (isLeftSwipe) {
			nextSlide()
		} else if (isRightSwipe) {
			prevSlide()
		}
	}, [touchStart, touchEnd, isTransitioning, nextSlide, prevSlide])

	// Modal management
	const { activeModal, selectedCar, openModal, closeModal } = useModal()

	// Modal handlers
	const handleOpenModal = useCallback(
		(type: 'rent' | 'buy' | 'details') => {
			openModal(type, currentCar)
		},
		[openModal, currentCar]
	)

	const handleRentFromDetails = useCallback(() => {
		closeModal()
		setTimeout(() => openModal('rent', selectedCar ?? undefined), 100)
	}, [closeModal, openModal, selectedCar])

	const handleBuyFromDetails = useCallback(() => {
		closeModal()
		setTimeout(() => openModal('buy', selectedCar ?? undefined), 100)
	}, [closeModal, openModal, selectedCar])
 
	return (
		<div
			className='relative w-full h-screen overflow-hidden'
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			{/* Performance Monitor */}
			<PerformanceMonitor />

			{/* Slides */}
			<AnimatePresence mode='wait'>
				<CarSlide
					key={currentCar.id}
					car={currentCar}
					isActive={true}
					prevCar={prevCar}
					nextCar={nextCar}
					onOpenModal={handleOpenModal}
				/>
			</AnimatePresence>

			{/* Car Counter */}
			<CarCounter
				currentSlide={currentSlide}
				totalSlides={displayCars.length}
				isVisible={showUI}
			/>

			{/* Filter */}
			<AnimatePresence>
				{showFilter && (
					<CarFilter
						selectedCategory={selectedCategory}
						onCategoryChange={setSelectedCategory}
						isVisible={showUI}
					/>
				)}
			</AnimatePresence>

			{/* Thumbnails */}
			<AnimatePresence>
				{showThumbnails && (
					<CarThumbnails
						cars={displayCars}
						currentSlide={currentSlide}
						onSlideChange={goToSlide}
						isVisible={showUI}
					/>
				)}
			</AnimatePresence>

			{/* Control Panel */}
			<motion.div
				className='absolute top-4 md:top-8 right-4 md:right-8 z-30 flex gap-2'
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: showUI ? 1 : 0.3, x: 0 }}
				transition={{ delay: 1 }}
			>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => setShowFilter(!showFilter)}
					className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 ${
						showFilter
							? 'bg-yellow-400 text-black'
							: 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
					}`}
					aria-label='Toggle filter'
				>
					<Filter className='w-4 h-4' />
				</Button>

				<Button
					variant='ghost'
					size='icon'
					onClick={() => setShowThumbnails(!showThumbnails)}
					className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 ${
						showThumbnails
							? 'bg-yellow-400 text-black'
							: 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
					}`}
					aria-label='Toggle thumbnails'
				>
					<Grid3X3 className='w-4 h-4' />
				</Button>

				<Button
					variant='ghost'
					size='icon'
					onClick={toggleAutoplay}
					className='w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all duration-300'
					aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
				>
					{isAutoPlaying ? (
						<Pause className='w-4 h-4' />
					) : (
						<Play className='w-4 h-4' />
					)}
				</Button>
			</motion.div>

			{/* Navigation Arrows */}
			<AnimatePresence>
				{showUI && (
					<>
						<motion.div
							className='absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{ delay: 1 }}
						>
							<Button
								variant='ghost'
								size='icon'
								onClick={prevSlide}
								disabled={isTransitioning}
								className='w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all duration-300 disabled:opacity-50'
								aria-label='Previous car'
							>
								<ChevronLeft className='w-6 h-6' />
							</Button>
						</motion.div>

						<motion.div
							className='absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ delay: 1 }}
						>
							<Button
								variant='ghost'
								size='icon'
								onClick={nextSlide}
								disabled={isTransitioning}
								className='w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all duration-300 disabled:opacity-50'
								aria-label='Next car'
							>
								<ChevronRight className='w-6 h-6' />
							</Button>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Slide Indicators */}
			<motion.div
				className='absolute bottom-1/3 left-1/2 transform -translate-x-1/2 z-20 flex gap-2'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: showUI ? 1 : 0.3, y: 0 }}
				transition={{ delay: 1.2 }}
			>
				{displayCars.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						disabled={isTransitioning}
						className={`w-2 h-2 rounded-full border transition-all duration-300 disabled:opacity-50 ${
							index === currentSlide
								? 'bg-yellow-400 border-yellow-400 w-6'
								: 'bg-transparent border-gray-500 hover:border-gray-300'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</motion.div>

			{/* Progress indicator */}
			<motion.div
				className='absolute top-0 left-0 h-1 bg-yellow-400 z-20'
				initial={{ width: '0%' }}
				animate={{ width: isAutoPlaying ? '100%' : '0%' }}
				transition={{
					duration: isAutoPlaying ? 15 : 0,
					ease: 'linear',
					repeat: isAutoPlaying ? Number.POSITIVE_INFINITY : 0,
				}}
				key={currentSlide}
			/>

			{/* Keyboard shortcuts hint */}
			<motion.div
				className='absolute bottom-4 right-4 z-20 text-white/40 text-xs'
				initial={{ opacity: 0 }}
				animate={{ opacity: showUI ? 0.6 : 0 }}
				transition={{ delay: 2 }}
			>
				<div className='text-right'>
					<p>Use ← → keys, 1-8 numbers, or Space to control</p>
					<p>Press F1 for performance monitor</p>
				</div>
			</motion.div>

			{/* Modals */}
			<RentCarModal
				isOpen={activeModal === 'rent'}
				onClose={closeModal}
				car={selectedCar}
			/>

			<BuyCarModal
				isOpen={activeModal === 'buy'}
				onClose={closeModal}
				car={selectedCar}
			/>

			<CarDetailsModal
				isOpen={activeModal === 'details'}
				onClose={closeModal}
				car={selectedCar}
				onRent={handleRentFromDetails}
				onBuy={handleBuyFromDetails}
			/>
		</div>
	)
})

CarsSection.displayName = 'CarsSection'

export default CarsSection
