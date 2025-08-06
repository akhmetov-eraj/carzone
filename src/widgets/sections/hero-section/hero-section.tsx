'use client'

import Container from '@/shared/ui/container'
import Image from 'next/image'

export default function HeroSection() {
	return (
		<section className="relative w-full h-[700px] lg:h-[680px] overflow-hidden">
			<Image
				src='/images/futuristic-sports-car.png'
				alt='Futuristic sports car'
				fill
				className='object-cover z-0'
			/>

			<div className='absolute inset-0 bg-black/30 md:bg-black/10 z-[1]' />

			<Container>
				<div className='relative z-10 pt-32 text-white'>
					{/* Top Info Section */}
					<div className='flex flex-col md:flex-row justify-between gap-6'>
						<div className='flex flex-col sm:flex-row items-start sm:items-start gap-2 sm:gap-5'>
							<p className='text-sm sm:text-base'>NEW YORK, USA</p>
							<hr className='hidden sm:flex self-start border-t w-32 md:w-36 lg:w-96 border-white' />
							<p className='text-sm sm:text-base max-w-[200px]'>Exotic car collection by Karzone</p>
						</div>

						<p className='max-w-[400px] text-sm sm:text-base indent-5'>
							From exotic sports cars to luxury sedans and SUVs, Karzone’s Exotic Car Collection offers an exceptional selection and trusted, personalised service.
						</p>
					</div>

					{/* Heading Section */}
					<div className='flex flex-col sm:flex-row items-start sm:items-center lg:pt-48 xl:pt-54 gap-40'>
						<p className='text-lg font-semibold'>001</p>
						<h1 className='text-4xl md:text-6xl lg:text-7xl font- max-w-xl'>
							Rent the luxury. Own the thrill.
						</h1>
					</div>

					{/* Action Section */}
				<div className='flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x-2 divide-white border-t-2 border-white mt-[60px]'>
  <div className='w-full sm:w-1/2 p-4 flex justify-between items-center hover:text-primary'>
    <p className='text-center sm:text-lef'>Rent a car</p>
    <span className="text-xl">→</span>
  </div>
  <div className='w-full sm:w-1/2 p-4 flex justify-between items-center hover:text-primary'>
    <p className='text-center sm:text-left '>Buy a car</p>
    <span className="text-xl">→</span>
  </div>
</div>
				</div>
			</Container>
		</section>
	)
}
