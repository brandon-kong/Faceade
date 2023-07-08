import { Canvas } from "@react-three/fiber";
import React from "react";

import { extend } from '@react-three/fiber';

extend({ Floor });
export default function Canvas3D() {
    return (
        <Canvas
        shadows={true}
        camera={{
            position: [-6, 7, 7],
          }}
        >
            <Floor />
        </Canvas>
    )
}

function Floor(props: any) {
    return (
      <mesh {...props} recieveShadow>
        
      </mesh>
    );
  }
  
  export { Floor };
  