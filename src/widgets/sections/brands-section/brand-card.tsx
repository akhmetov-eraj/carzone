'use client'

import { Brand } from '@/entities/brands/types/brand'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BrandCardProps {
	brand: Brand
	index: number
	isHovered: boolean
	isAnyHovered: boolean
	onHover: (brandName: string | null) => void
}

export function BrandCard({
	brand,
	index,
	isHovered,
	isAnyHovered,
	onHover,
}: BrandCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50, rotateX: -15 }}
			animate={{ opacity: 1, y: 0, rotateX: 0 }}
			transition={{
				duration: 0.8,
				delay: index * 0.15,
				type: 'spring',
				stiffness: 100,
			}}
			className={`relative group   cursor-pointer ${
				brand.featured ? 'md:col-span-1 lg:col-span-1' : ''
			}`}
			onMouseEnter={() => onHover(brand.name)}
			onMouseLeave={() => onHover(null)}
		>
			{/* Glow effect */}
			<motion.div
				className={`absolute inset-0 rounded-2xl bg-[#1E1E1E] blur-xl`}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{
					opacity: isHovered ? 0.6 : 0,
					scale: isHovered ? 1.1 : 0.8,
				}}
				transition={{ duration: 0.4 }}
			/>

			<motion.div
				className={`
    relative bg-[#1E1E1E]  border border-[#1E1E1E] rounded-2xl p-8 
    transition-all duration-500 overflow-hidden
    ${brand.featured ? 'ring-2 ring-yellow-400/30' : ''}
    flex items-center justify-center min-h-[140px]
  `}
				animate={{
					scale: isHovered ? 1.2 : isAnyHovered ? 0.9 : 1, // ✅ уже есть
					borderColor: isHovered
						? brand.accent.split('-')[1] + '-400'
						: 'rgb(31 41 55)',
				}}
				transition={{
					duration: 0.4,
					type: 'spring',
					stiffness: 200,
					damping: 20,
				}}
				whileHover={{
					y: -8,
					transition: { duration: 0.2 },
				}}
			>
				{/* Shine effect */}
				<motion.div
					className='absolute inset-0 from-transparent bg-[#1E1E1E] to-transparent -skew-x-12'
					initial={{ x: '-100%' }}
					animate={{
						x: isHovered ? '100%' : '-100%',
					}}
					transition={{ duration: 0.6, delay: 0.1 }}
				/>

				<motion.div
					animate={{
						scale: isHovered ? 1.25 : isAnyHovered ? 0.9 : 1,
						opacity: !isAnyHovered || isHovered ? 1 : 0.25,
						rotateY: isHovered ? 5 : 0,
					}}
					transition={{
						duration: 0.4,
						type: 'spring',
						stiffness: 150,
					}}
					className='relative z-10 w-[100px] h-[100px] flex items-center justify-center'
				>
					<Image
						src={brand.logo || '/placeholder.svg'}
						alt={brand.name}
						fill
						className='
      object-contain transition-all duration-500
      filter grayscale brightness-75
      group-hover:grayscale-0 group-hover:brightness-110
      group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]
    '
					/>
				</motion.div>
				{/* Brand name overlay */}
				<motion.div
					className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${brand.color} blur-xl`}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{
						opacity: isHovered ? 0.8 : 0, // ✅ было 0.6
						scale: isHovered ? 1.2 : 0.8, // ✅ увеличим
					}}
					transition={{ duration: 0.3, delay: 0.1 }}
				>
					<p className='text-xs font-medium text-white/80 text-center'>
						{brand.name}
					</p>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}
