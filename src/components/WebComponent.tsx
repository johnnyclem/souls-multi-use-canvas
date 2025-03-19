import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface WebComponentProps {
  url: string;
  type?: '3d' | 'web';
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const WebComponent: React.FC<WebComponentProps> = ({ url, type = 'web' }) => {
  if (type === '3d') {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: '#f0f0f0' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model url={url} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={url}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Web Content"
      />
    </div>
  );
};

export default WebComponent;
