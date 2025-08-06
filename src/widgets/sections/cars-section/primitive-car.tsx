'use client'

import { useFrame } from '@react-three/fiber'
import { memo, useRef } from 'react'
import * as THREE from 'three'

interface PrimitiveCarProps {
  color: string
  isActive: boolean
}

const PrimitiveCar = memo<PrimitiveCarProps>(({ color, isActive }) => {
  const groupRef = useRef<THREE.Group>(null)
  const wheelRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (groupRef.current && isActive) {
      // Легкое покачивание
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
      // Вращение колес
      wheelRefs.current.forEach((wheel) => {
        if (wheel) {
          wheel.rotation.x += 0.02
        }
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Основной корпус */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Крыша */}
      <mesh position={[0, 1.2, -0.2]} castShadow>
        <boxGeometry args={[3, 0.8, 1.6]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Колеса */}
      {[
        [-1.5, 0, 1.2],
        [1.5, 0, 1.2],
        [-1.5, 0, -1.2],
        [1.5, 0, -1.2],
      ].map((position, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) wheelRefs.current[index] = el
          }}
          position={position as [number, number, number]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial 
            color="#222222" 
            metalness={0.1} 
            roughness={0.8}
          />
        </mesh>
      ))}
      
      {/* Фары */}
      <mesh position={[1.8, 0.3, 0.7]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[1.8, 0.3, -0.7]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Задние фонари */}
      <mesh position={[-1.8, 0.3, 0.7]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[-1.8, 0.3, -0.7]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
})

PrimitiveCar.displayName = 'PrimitiveCar'
export default PrimitiveCar
