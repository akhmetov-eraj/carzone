"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/ui/button";

const Header = () => {
  return (
	<header className='px-[10px]'>
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-5 opacity-5 max-w-7xl m-auto rounded-full left-0 right-0 z-50  bg-[#3F3E41] opa backdrop-blur-md border-b border-white/10" 
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white tracking-wider"
          >
            KARZONE
          </motion.div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Reservations", "Vehicles", "Locations", "Car Sales", "For Business"].map((item) => (
              <motion.a
                key={item}
                href="#"
                whileHover={{ y: -2 }}
                className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Contact Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-[#FEF425] text-black hover:bg-yellow-300 font-semibold px-6 py-2 rounded-full">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
	</header>

  );
};

export default Header;