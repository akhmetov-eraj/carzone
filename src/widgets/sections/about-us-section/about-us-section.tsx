"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const AboutSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // About Us text
  const aboutUsText = "About Us"
  const aboutUsWords = aboutUsText.split(" ")

  // Main heading text
  const mainText =
    "From exotic sports cars to luxury sedans and SUVs, Karzone's Exotic Car Collection offers an exceptional selection and Karzone's trusted, personalised service."
  const mainWords = mainText.split(" ")

  // Paragraph text
  const paragraphText =
    "We provide selection of finest luxury cars to hire such as various types of Mercedes Benz, Hummer, BMW, Porsche, Alphard, Velfire, Mini Cooper, Fortuner, Land Cruiser, and a variety of Toyota fine cars. It's all here to make your delightful days."
  const paragraphWords = paragraphText.split(" ")

  // Create all useTransform hooks for About Us
  const aboutUsOpacity0 = useTransform(scrollYProgress, [0, 0.1], [0.2, 1])
  const aboutUsOpacity1 = useTransform(scrollYProgress, [0.05, 0.15], [0.2, 1])

  // Create all useTransform hooks for main text
  const mainOpacities = Array.from({ length: mainWords.length }, (_, i) => {
    const start = 0.2 + (i / mainWords.length) * 0.5
    const end = start + 0.05
    return [start, end]
  }).map(([start, end]) => useTransform(scrollYProgress, [start, end], [0.2, 1]))

  // Create all useTransform hooks for paragraph
  const paragraphOpacities = Array.from({ length: paragraphWords.length }, (_, i) => {
    const start = 0.7 + (i / paragraphWords.length) * 0.3
    const end = start + 0.02
    return [start, end]
  }).map(([start, end]) => useTransform(scrollYProgress, [start, end], [0.2, 1]))

  return (
    <div ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* About Us label with yellow dot */}
          <div className="flex mb-12">
            <div className="w-[20%] flex justify-center space-x-3">
              <hr className="h-1 w-12 bg-[#FEF425]"></hr>
              <h2 className="text-xl font-semibold uppercase tracking-widest">
                <motion.span style={{ opacity: aboutUsOpacity0 }} className="inline-block mr-2 text-gray-300">
                  About
                </motion.span>
                <motion.span style={{ opacity: aboutUsOpacity1 }} className="inline-block mr-2 text-gray-300">
                  Us
                </motion.span>
              </h2>
            </div>

            {/* Main heading with text reveal animation */}
            <div className="w-[80%] ml-[75px]">
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-8">
                {mainWords.map((word, i) => {
                  const isSecondPart = i >= mainWords.indexOf("offers")
                  return (
                    <motion.span
                      key={i}
                      style={{ opacity: mainOpacities[i] }}
                      className={`inline-block mr-2 ${"text-gray-50"}`}
                    >
                      {word}
                    </motion.span>
                  )
                })}
              </h2>
            </div>
          </div>

          <div className="flex">
            {/* Horizontal line */}
            <hr className="block h-1 w-[50%] bg-gray-500"></hr>

            {/* Paragraph text with reveal animation */}
            <div className="text-lg md:text-xl max-w-[500px] leading-relaxed">
              {paragraphWords.map((word, i) => (
                <motion.span
                  key={i}
                  style={{ opacity: paragraphOpacities[i] }}
                  className="inline-block mr-1 text-gray-300"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
