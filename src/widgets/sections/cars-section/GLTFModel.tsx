"use client"

import { useRef, useEffect, memo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { useModelCache } from '@/shared/hooks/use-modal-cache'
import { useGLTFLoader } from '@/shared/hooks/use-gltf-loader'
import { CarData } from '@/entities/cars/data/car'

interface GLTFModelProps {
  carData: CarData
  isActive: boolean
}

const GLTFModel = memo<GLTFModelProps>(({ carData, isActive }) => {
  const groupRef = useRef<THREE.Group>(null)
  const { getModel, setModel } = useModelCache()
  const { model, loading, error } = useGLTFLoader(carData.modelPath)

  // Cache the model when loaded
  useEffect(() => {
    if (model && carData.modelPath) {
      setModel(carData.modelPath, model)
    }
  }, [model, carData.modelPath, setModel])

  // Auto rotation animation
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Apply car color to model materials
  useEffect(() => {
    if (model && carData.color) {
      model.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                if (mat.name?.toLowerCase().includes("paint") || mat.name?.toLowerCase().includes("body")) {
                  const material = mat as THREE.MeshStandardMaterial
                  if (material.color) {
                    material.color.setHex(Number.parseInt(carData.color.replace("#", "0x")))
                  }
                }
              })
            } else {
              const material = mesh.material as THREE.MeshStandardMaterial
              if (material.name?.toLowerCase().includes("paint") || material.name?.toLowerCase().includes("body")) {
                if (material.color) {
                  material.color.setHex(Number.parseInt(carData.color.replace("#", "0x")))
                }
              }
            }
          }
        }
      })
    }
  }, [model, carData.color])

  if (loading) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[4, 1.5, 2]} />
          <meshStandardMaterial color="#333333" transparent opacity={0.3} />
        </mesh>
      </group>
    )
  }

  if (error || !model) {
    console.warn(`Failed to load model for ${carData.brand}:`, error)
    return null // Will fallback to primitive car
  }

  return (
    <group
      ref={groupRef}
      position={carData.modelPosition || [0, 0, 0]}
      scale={carData.modelScale || 1}
      rotation={carData.modelRotation || [0, 0, 0]}
    >
      <primitive object={model.scene} />
    </group>
  )
})

GLTFModel.displayName = "GLTFModel"

export default GLTFModel
