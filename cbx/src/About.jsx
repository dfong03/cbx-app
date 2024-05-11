import NavBar from "./Transition-B/Transition-B";
import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
export default function About() {
    const [Init, setInit] = useState(false);

    const Rig = () => {
        const refCamera = useRef();
        let zoomConstant = 1.5;

        useFrame((state) => {
            if (state.camera) {
                if (Init) {
                    state.camera.position.y = THREE.MathUtils.damp(
                        state.camera.position.y, //rotation
                        -50, //target point
                        2.0, //jerkiness
                        0.01 //change in time
                    );

                    state.camera.position.z = THREE.MathUtils.damp(
                        state.camera.position.z, //rotation
                        200 * zoomConstant, //target point
                        2.0, //jerkiness
                        0.01 //change in time
                    );

                    state.camera.position.x = THREE.MathUtils.damp(
                        state.camera.position.x, //rotation
                        -310 * zoomConstant, //target point
                        2.0, //jerkiness
                        0.01 //change in time
                    );
                }

                state.camera.lookAt(0, 0, 0);
            }
        });

        return (
            <PerspectiveCamera
                makeDefault
                position={[-2180 * 0.5, 600, 400 * 0.5]}
                near={1}
                fov={19}
                far={3000}
                zoom={1.2}
                ref={refCamera}
            />
        );
    };

    const Obj = () => {
        const refMesh = useRef();
        const gltf = useLoader(GLTFLoader, "./thelion.glb");

        useFrame(({ state }) => {
            if (refMesh.current && Init) {
                // refMesh.current.scale.set(2,2,2)
                // rotating the object
                refMesh.current.rotation.y = THREE.MathUtils.damp(
                    refMesh.current.rotation.y, //rotation
                    -(Math.PI * 2), //target point
                    2.5, //jerkiness
                    0.01 //change in time
                );
            }
        });

        return (
            <group
                position={[0, -355, 0]}
                rotation={[0, -Math.PI, 0]}
                ref={refMesh}
            >
                <primitive object={gltf.scene} />
            </group>
        );
    };

    // const position = useMousePosition();
    const [transition, setTransition] = useState(false);
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setTransition(true);
    //     }, 3000);
    //     return () => clearTimeout(timeout);
    // }, []);

    const W = () => {
        const refMesh = useRef();
        const store = useRef();
        console.log("hi");

        // Set the reference when the refMesh exists
        useEffect(() => {
            if (refMesh.current) {
                store.current.targetObj = refMesh.current;
            }
        }, []);
    };
    return (
        <div>
            <NavBar />

            <div
                style={{
                    flex: "0 0 100%",
                    height: "30vw",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "11rem",
                    textAlign: "center",
                    marginLeft: "-35rem",
                }}
            >
                <p>
                    Founded in 2024, CBX Partners is a private equity <br></br>
                    firm ran exclusively by Columbia undergraduates.<br></br>
                    CBX Partners makes co-investments in buyout<br></br>
                    transactions alongside partner private investment firms.
                </p>
            </div>

            <div
                onClick={() => {
                    setInit(true);
                }}
                style={{
                    width: "100vh",
                    height: "fit-content",
                    overflow: "visible",
                }}
            >
                <Canvas
                    className="absolute top-0 left-0 mt-[20vh] ml-[0vh]"
                >
                    <Rig />
                    <directionalLight
                        color="white"
                        position={[200, -100, -500]}
                        intensity={3}
                    />
                    <directionalLight
                        color="white"
                        position={[-30, 100, 30]}
                        intensity={3}
                    />
                    <ambientLight />
                    <Obj />
                </Canvas>
            </div>
        </div>
    );
}
