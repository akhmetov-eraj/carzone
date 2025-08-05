"use client"

import { useRef, memo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface PrimitiveCarProps {
  color: string
  isActive: boolean
}

const PrimitiveCar = memo<PrimitiveCarProps>(({ color, isActive }) => {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    // Корневая группа теперь в позиции 0,0,0 (центр на земле)
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.5, 1.2, 2]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Hood */}
      <mesh position={[1.8, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.6, 1.8]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Roof/Cabin */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.8, 1.6]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.8, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.6, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.3} />
      </mesh>

      {/* Wheels */}
      {[
        [-1.5, 0.15, 1.1],
        [-1.5, 0.15, -1.1],
        [1.5, 0.15, 1.1],
        [1.5, 0.15, -1.1],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, 0, pos[2] > 0 ? 0.16 : -0.16]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
            <meshStandardMaterial color="#e5e5e5" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      <mesh position={[2.3, 0.7, 0.7]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[2.3, 0.7, -0.7]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
})

PrimitiveCar.displayName = "PrimitiveCar"

export default PrimitiveCar
