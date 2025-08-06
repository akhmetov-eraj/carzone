'use client'

import { CarData } from '@/entities/cars/types/car'
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { Suspense, memo, useEffect, useMemo, useState } from 'react'
import GLTFModel from './GLTFModel'
import PrimitiveCar from './primitive-car'

interface CarModelProps {
  carData: CarData
  isActive: boolean
}

const CarModel = memo<CarModelProps>(({ carData, isActive }) => {
  // ✅ состояние для кастомного зума (масштаб модели)
  const [scale, setScale] = useState(1)

  // ✅ обработка прокрутки колесика мыши
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setScale(prev => {
        const newScale = prev - e.deltaY * 0.0015 // скорость реакции
        return Math.min(3, Math.max(0.5, newScale)) // границы от 0.5 до 3
      })
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  // ✅ Простая конфигурация OrbitControls без проблемных настроек
  const controlsConfig = useMemo(
    () => ({
      enablePan: false,
      enableZoom: true,
      maxPolarAngle: Math.PI / 2.2,
      minPolarAngle: Math.PI / 3,
      autoRotate: isActive,
      autoRotateSpeed: 0.5,
      enableDamping: true,
      dampingFactor: 0.05,
      maxDistance: 8,
      minDistance: 2,
    }),
    [isActive]
  )

  return (
    <>
      {/* Простая камера без дополнительных настроек */}
      <PerspectiveCamera 
        makeDefault 
        position={[5, 3, 7]} 
        fov={50}
      />
      
      {/* Простые OrbitControls без ref и target */}
      <OrbitControls {...controlsConfig} />
      
      <Environment preset='studio' background={false} blur={0.8} />
      
      {/* Освещение */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      <pointLight position={[-8, 4, -8]} intensity={0.3} color='#4f46e5' />
      <pointLight position={[8, 4, 8]} intensity={0.3} color='#f59e0b' />
      
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      {/* ✅ теперь модель масштабируется по колесику */}
      <group position={[0, 0, 0]} scale={scale}>
        <Suspense
          fallback={
            <group>
              <mesh>
                <boxGeometry args={[4, 1.5, 2]} />
                <meshStandardMaterial
                  color='#333333'
                  transparent
                  opacity={0.3}
                />
              </mesh>
            </group>
          }
        >
          {carData.modelPath ? (
            <GLTFModel carData={carData} isActive={isActive} />
          ) : (
            <PrimitiveCar color={carData.color} isActive={isActive} />
          )}
        </Suspense>
      </group>

      {/* Фолбэк, если GLB не загрузился */}
      <Suspense fallback={null}>
        <group visible={false}>
          <PrimitiveCar color={carData.color} isActive={isActive} />
        </group>
      </Suspense>
    </>
  )
})

CarModel.displayName = 'CarModel'
export default CarModel
