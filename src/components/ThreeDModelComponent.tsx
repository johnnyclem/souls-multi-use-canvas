// src/components/ThreeDModelComponent.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ContentData } from '../types';

// Props for the Model component
interface ModelProps {
  url: string; // URL of the GLTF model
}

// Model component to load and manage the 3D model
const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useThree(); // Access the Three.js scene
  const mixer = useRef<THREE.AnimationMixer | null>(null); // Animation mixer reference
  const modelRef = useRef<THREE.Object3D | null>(null); // Reference to the loaded model

  // Load the model and set up animations and lights
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      modelRef.current = gltf.scene; // Store the model
      scene.add(gltf.scene); // Add model to the scene

      // Center and scale the model to fit the view
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Scale to fit in a 2x2x2 cube
      gltf.scene.scale.setScalar(scale);
      gltf.scene.position.sub(center.multiplyScalar(scale));

      // Set up animations if the model includes them
      if (gltf.animations.length > 0) {
        mixer.current = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          mixer.current?.clipAction(clip).play(); // Play each animation
        });
      }
    });

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
    directionalLight.position.set(5, 5, 5); // Position the light
    scene.add(directionalLight);

    // Clean up resources when the component unmounts
    return () => {
      if (modelRef.current) {
        scene.remove(modelRef.current); // Remove model from scene
      }
      mixer.current?.stopAllAction(); // Stop animations
      mixer.current = null; // Clear mixer
    };
  }, [url, scene]);

  // Update animations on each frame
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta); // Update animation mixer
    }
  });

  return null; // This component doesn't render anything itself
};

// Main component for the 3D model display
interface ThreeDModelComponentProps {
  data: ContentData;
}

const ThreeDModelComponent: React.FC<ThreeDModelComponentProps> = ({ data }) => {
  const modelUrl = data.modelUrl || `${process.env.PUBLIC_URL}/sample.gltf`; // Use a default model if none provided

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="w-full h-96 rounded-lg shadow-md overflow-hidden">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000,
          }}
        >
          {/* Load and display the model */}
          <Model url={modelUrl} />
          {/* Add orbit controls for user interaction */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDModelComponent; 