import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ThreeContainer = () => {
  const container = useRef()

  useEffect(() => {
    // Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x282c34);

    // Define a camera, set it to fill the browser window and position it
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 5;

    // Create lights and add them to the scene
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const loader = new GLTFLoader()
    loader.load(
      'atom-test.glb',
      (gltf) => {
        scene.add(gltf.scene)
      },
      undefined,
      (error) => {
        console.error(error)
      }
    );

    // Add controls, targetting the same DOM element
    let controls = new OrbitControls(camera, container.current);
    controls.enableZoom = false;

    // Define a renderer, and set it to fill the browser window
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    // Get an element from the DOM and append renderer.domElement to it
    container.current.appendChild(renderer.domElement);
  }, [])

  return <div ref={container}></div>
}

export default ThreeContainer;