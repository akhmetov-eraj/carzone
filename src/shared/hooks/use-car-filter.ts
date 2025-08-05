"use client"

import { useState, useMemo } from "react"
import { carsData, type CarCategory } from "@/entities/cars/data/cars"

export function useCarFilter() {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>("All")

  const filteredCars = useMemo(() => {
    if (selectedCategory === "All") {
      return carsData
    }
    return carsData.filter((car) => car.category === selectedCategory)
  }, [selectedCategory])

  return {
    selectedCategory,
    setSelectedCategory,
    filteredCars,
    allCars: carsData,
  }
}
