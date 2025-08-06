"use client"

import { CarData } from '@/entities/cars/types/car'
import { ModalType } from '@/entities/modal/types/modal'
import { useState, useCallback } from "react"


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
