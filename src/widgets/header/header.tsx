'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Header = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const links = [
    ['Reservations', '/reservations'],
    ['Vehicles', '/vehicles'],
    ['Locations', '/locations'],
    ['Car Sales', '/car-sales'],
    ['For Business', '/for-business'],
  ]

  return (
    <header className='px-[10px]'>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='fixed top-5 max-w-7xl m-auto rounded-full left-0 right-0 z-50 bg-background/70 p-[4px] backdrop-blur-md border-b border-white/10'
      >
        <div className='max-w-7xl mx-auto px-4 py-2 border-2 border-solid border-black rounded-full'>
          <div className='flex items-center justify-between'>
            
            {/* Logo */}
            <div className='flex items-center gap-1'>
              <motion.div
                className='w-8 h-8 bg-white flex items-center justify-center rounded'
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Link href={'/'}>
                  <span className='text-black font-bold text-xl'>С</span>
                </Link>
              </motion.div>
              <Link href={'/'}>
                <motion.span
                  className='text-2xl font-bold tracking-wider'
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  ARZONE
                </motion.span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-8'>
              {links.map(([label, href]) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`transition-colors duration-300 font-medium ${
                      isActive ? 'text-primary' : 'text-white/80 hover:text-primary'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            {/* Burger Button for Mobile */}
            <div className='md:hidden'>
              <button
                className='flex flex-col justify-between w-6 h-5 focus:outline-none'
                onClick={() => setMenuOpen(prev => !prev)}
              >
                <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>

            {/* Contact Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='hidden md:block'>
              <Button
                onClick={() => setContactOpen(true)}
                className='bg-[#FEF425] text-black hover:bg-yellow-300 font-semibold px-6 py-2 rounded-full'
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-md p-5 flex flex-col space-y-4 items-center border-t border-white/10'
          >
            {links.map(([label, href]) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg transition-colors duration-300 font-medium ${
                    isActive ? 'text-primary' : 'text-white/80 hover:text-primary'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Button
              onClick={() => {
                setMenuOpen(false)
                setContactOpen(true)
              }}
              className='bg-[#FEF425] text-black hover:bg-yellow-300 font-semibold px-6 py-2 rounded-full'
            >
              Contact Us
            </Button>
          </motion.div>
        )}
      </motion.nav>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-background rounded-2xl shadow-xl p-6 w-11/12 max-w-md'
              onClick={e => e.stopPropagation()}
            >
              <h2 className='text-xl font-bold mb-4'>Contact Us</h2>
              <form className='flex flex-col gap-3'>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='border p-2 rounded w-full'
                />
                <input
                  type='email'
                  placeholder='Your Email'
                  className='border p-2 rounded w-full'
                />
                <textarea
                  placeholder='Your Message'
                  className='border p-2 rounded w-full h-24 resize-none'
                ></textarea>
                <Button className='bg-[#FEF425] text-black hover:bg-yellow-300 font-semibold px-4 py-2 rounded'>
                  Send
                </Button>
              </form>
              <button
                onClick={() => setContactOpen(false)}
                className='absolute top-3 right-5 text-gray-500 hover:text-black text-lg'
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
