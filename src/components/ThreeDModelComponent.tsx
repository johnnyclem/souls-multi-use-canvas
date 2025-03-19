// src/components/ThreeDModelComponent.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { ContentData } from '../types';

// Extend Three.js with GLTFLoader
extend({ GLTFLoader });

// Props for the Model component
interface ModelProps {
  url: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Loading indicator component
const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center z-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

// Model component to load and manage the 3D model
const Model: React.FC<ModelProps> = ({ url, onLoad, onError }) => {
  const { scene, gl } = useThree();
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const lightsRef = useRef<THREE.Light[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);

  // Validate WebGL context
  useEffect(() => {
    if (!gl) {
      console.error('WebGL context not available');
      onError?.(new Error('WebGL context not available'));
      return;
    }

    const webgl = gl.getContext();
    if (!webgl) {
      console.error('Failed to get WebGL context');
      onError?.(new Error('Failed to get WebGL context'));
      return;
    }

    // Check for WebGL errors
    const glError = webgl.getError();
    if (glError !== webgl.NO_ERROR) {
      console.error('WebGL error:', glError);
      onError?.(new Error(`WebGL error: ${glError}`));
      return;
    }
  }, [gl, onError]);

  useEffect(() => {
    const loader = new GLTFLoader();
    
    // Clean up previous model and lights
    const cleanup = () => {
      if (modelRef.current) {
        scene.remove(modelRef.current);
      }
      lightsRef.current.forEach(light => scene.remove(light));
      lightsRef.current = [];
      mixer.current?.stopAllAction();
      mixer.current = null;
    };

    cleanup(); // Clean up before loading new model

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -5);

    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(backLight);
    lightsRef.current = [ambientLight, directionalLight, backLight];

    // Load the model with progress tracking
    loader.load(
      url,
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
        modelRef.current = gltf.scene;
        scene.add(gltf.scene);

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        gltf.scene.scale.setScalar(scale);
        gltf.scene.position.sub(center.multiplyScalar(scale));

        // Set up animations
        if (gltf.animations.length > 0) {
          console.log('Animations found:', gltf.animations.length);
          mixer.current = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer.current?.clipAction(clip).play();
          });
        }

        onLoad?.();
      },
      (progress) => {
        const percent = (progress.loaded / progress.total) * 100;
        console.log(`Loading progress: ${percent.toFixed(2)}%`);
        setLoadProgress(percent);
      },
      (error) => {
        console.error('Error loading model:', error);
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    );

    return cleanup;
  }, [url, scene, onLoad, onError]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return null;
};

interface ThreeDModelComponentProps {
  data: ContentData;
}

const ThreeDModelComponent: React.FC<ThreeDModelComponentProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const modelUrl = data.modelUrl || `${process.env.PUBLIC_URL}/milkTruck.gltf`;

  const handleLoad = () => {
    setIsLoading(false);
    setLoadProgress(100);
  };

  const handleError = (error: Error) => {
    setIsLoading(false);
    setError(error.message);
    console.error('Model loading error:', error);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="w-full h-96 rounded-lg shadow-md overflow-hidden bg-gray-900 relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <LoadingSpinner />
            <div className="mt-4 text-white">
              Loading model... {loadProgress.toFixed(1)}%
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 z-10">
            Error loading model: {error}
          </div>
        )}
        <div className="absolute inset-0">
          <Canvas
            camera={{
              position: [0, 2, 5],
              fov: 45,
              near: 0.1,
              far: 1000,
            }}
            onError={(event) => {
              console.error('Canvas error:', event);
              setError('Failed to initialize WebGL context');
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <color attach="background" args={['#1a1a1a']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Grid
              args={[10, 10]}
              position={[0, -1, 0]}
              cellColor="#6e6e6e"
              sectionColor="#9d9d9d"
              fadeDistance={30}
              fadeStrength={1}
              followCamera={false}
            />
            <Model 
              url={modelUrl} 
              onLoad={handleLoad} 
              onError={handleError}
            />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
              target={[0, 0, 0]}
              makeDefault
            />
            <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default ThreeDModelComponent; 