import { Merged, useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

export function TransistorInstances({ objects }) {
  // 1. Load the model
  const { nodes } = useGLTF('/models/AND.glb')

  // 2. Create a "Instances" mapping
  // This maps the specific meshes from your GLTF to instanced meshes
  const instances = useMemo(() => ({
    Body: nodes.BodyMesh, // Replace with actual node names from your GLTF
    Legs: nodes.LegsMesh,
  }), [nodes])

  return (
    <Merged meshes={instances}>
      {(models) => (
        // 3. 'models' now contains components for each part
        <>
          {objects.map((d) => (
            <group key={d.id} position={d.position} rotation={[0, d.rotation ?? 0, 0]}>
              {/* These are the instanced versions of your GLTF parts */}
              <models.Body />
              <models.Legs />
            </group>
          ))}
        </>
      )}
    </Merged>
  )
}

useGLTF.preload('/transistor-model.glb')