"use client"

import { useState, useCallback } from "react"
import type { ModalType } from "@/types/modal"
import type { CarData } from "@/types/car"

export function useModal() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null)

  const openModal = useCallback((type: ModalType, car?: CarData) => {
    setActiveModal(type)
    if (car) setSelectedCar(car)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    // Don't clear selectedCar immediately to allow exit animations
    setTimeout(() => setSelectedCar(null), 300)
  }, [])

  return {
    activeModal,
    selectedCar,
    openModal,
    closeModal,
  }
}
