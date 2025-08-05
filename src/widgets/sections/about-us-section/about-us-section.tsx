import React from 'react'

const AboutSection = () => {
	return (
		<section className='py-[100px]'>
			{/* About Us label with yellow dot */}
			<div className='flex'>
				<div className='w-[20%] flex justify-center mb-8 space-x-3'>
					<hr className='block flex h-1 w-12 bg-[#FEF425] mx-auto'></hr>
					<h2 className='text-xl font-semibold uppercase tracking-widest text-gray-300'>
						About Us
					</h2>
				</div>

				{/* Main heading */}
				<h2 className='w-[80%] text-3xl md:text-5xl font-semibold leading-tight mb-6 text-gray-50 ml-[75px]'>
					From exotic sports cars to luxury sedans and SUVs, Karzone&apos;s
					Exotic Car Collection{' '}
					<span className='text-gray-500'>
						{' '}
						offers an exceptional selection and Karzone&apos;s trusted,
						personalised service.
					</span>
				</h2>
			</div>
			<div></div>

			<div className='flex'>
				{/* Paragraph text with improved readability */}
				<hr className='block h-1 w-[50%] bg-gray-500 mx-auto'></hr>
				<p className='text-lg md:text-xl max-w-[500px] opacity-80 leading-relaxed mb-12 text-gray-300'>
					We provide selection of finest luxury cars to hire such as various
					types of Mercedes Benz, Hummer, BMW, Porsche, Alphard, Velfire, Mini
					Cooper, Fortuner, Land Cruiser, and a variety of Toyota fine cars.
					It&apos;s all here to make your delightful days.
				</p>

				{/* Horizontal yellow line for emphasis */}
			</div>
		</section>
	)
}

export default AboutSection
