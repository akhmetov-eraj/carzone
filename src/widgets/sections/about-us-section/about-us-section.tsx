"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { WordRevealSpan } from "./word-reveal-span" // Import the new component

const AboutSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // Progress is 0 when target enters viewport, 1 when it leaves
  })

  // About Us text
  // const aboutUsText = "About Us"
  // const aboutUsWords = aboutUsText.split(" ")

  // Main heading text
  const mainText =
    "From exotic sports cars to luxury sedans and SUVs, Karzone's Exotic Car Collection offers an exceptional selection and Karzone's trusted, personalised service."
  const mainWords = mainText.split(" ")

  // Paragraph text
  const paragraphText =
    "We provide selection of finest luxury cars to hire such as various types of Mercedes Benz, Hummer, BMW, Porsche, Alphard, Velfire, Mini Cooper, Fortuner, Land Cruiser, and a variety of Toyota fine cars. It's all here to make your delightful days."
  const paragraphWords = paragraphText.split(" ")

  // Create all useTransform hooks for About Us (these are fine as they are not in a loop)
  const aboutUsOpacity0 = useTransform(scrollYProgress, [0, 0.1], [0.2, 1])
  const aboutUsOpacity1 = useTransform(scrollYProgress, [0.05, 0.15], [0.2, 1])

  return (
    <div ref={targetRef} className="relative h-[300vh] text-white">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* About Us label with yellow dot */}
          <div className="flex mb-12 flex-col md:flex-row">
            <div className="w-full md:w-[20%] flex justify-center md:justify-start space-x-3 mb-8 md:mb-0">
              <hr className="h-1 w-12 bg-[#FEF425] translate-y-[10px]"></hr>
              <h2 className="text-[14px] sm:text-xl font-semibold uppercase tracking-widest">
                <motion.span style={{ opacity: aboutUsOpacity0 }} className="inline-block mr-2 text-gray-300">
                  About
                </motion.span>
                <motion.span style={{ opacity: aboutUsOpacity1 }} className="inline-block mr-2 text-gray-300">
                  Us
                </motion.span>
              </h2>
            </div>
            {/* Main heading with text reveal animation */}
            <div className="w-full md:w-[80%] md:ml-[70px]">
              <h2 className="text-[18px] sm:text-3xl md:text-5xl font-semibold leading-tight mb-8">
                {mainWords.map((word, i) => (
                  <WordRevealSpan
                    key={i}
                    word={word}
                    index={i}
                    scrollYProgress={scrollYProgress}
                    baseScrollStart={0.2}
                    scrollRangeFactor={0.5}
                    opacityRevealDuration={0.05}
                    className="text-gray-50 mr-2" // Added mr-2 here for spacing
                    totalWords={mainWords.length}
                  />
                ))}
              </h2>
            </div>
          </div>
          <div className="flex gap-6 justify-end flex-col md:flex-row">
            {/* Horizontal line */}
            <hr className="block h-[2px] w-full md:w-[30%] bg-[#404040] border-0 mb-6 md:mb-0" />
            {/* Paragraph text with reveal animation */}
            <div className="text-[16px] md:text-xl max-w-[500px] leading-relaxed">
              {paragraphWords.map((word, i) => (
                <WordRevealSpan
                  key={i}
                  word={word}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  baseScrollStart={0.7}
                  scrollRangeFactor={0.3}
                  opacityRevealDuration={0.02}
                  className="text-gray-300 mr-1" // Added mr-1 here for spacing
                  totalWords={paragraphWords.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
