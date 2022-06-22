
import * as THREE from 'three';
import React from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export function SceneCurrentPackage(props) {
    const { useRef, useEffect, useState } = React
    const mount = useRef(null)
    const [isAnimating, setAnimating] = useState(true)
    const controls = useRef(null)

    const handleProps = (props) => {
        if (props.objects && controls?.scene) {
        
            if (controls.scene?.children) {
                for( var i = controls.scene.children.length - 1; i >= 0; i--) { 
                    let obj = controls.scene.children[i];
                    controls.scene.remove(obj);
                }
            }
    
            for (let obj of props.objects) {
                controls.scene.add(obj);
                obj.position.set(0, 0, 0);
            }
        }

        if (props.camera && controls?.camera) {
            controls.camera.position.set(props.camera.x, props.camera.y, props.camera.z);
        }
    }
    
    useEffect(() => {
        let width = mount.current.clientWidth - 15;
        let height = mount.current.clientHeight || props.height;
        let frameId;
    
        const scene = new THREE.Scene({background: 0xffffff})
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.set(props.bin.x * 1.25, 0, 0)
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        // remove later
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );
        // The X axis is red. The Y axis is green. The Z axis is blue.

        renderer.setClearColor( 0xffffff, 0);
        renderer.setSize(width, height)

        const renderScene = () => {
            renderer.render(scene, camera)
        }
    
        const handleResize = () => {
            width = mount.current.clientWidth
            height = mount.current.clientHeight
            renderer.setSize(width, height)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderScene()
        }
        
        const animate = () => {
            renderScene()
            frameId = window.requestAnimationFrame(animate)
        }
    
        const start = () => {
            if (!frameId) {
            frameId = requestAnimationFrame(animate)
            }
        }
    
        const stop = () => {
            cancelAnimationFrame(frameId)
            frameId = null
        }
    
        mount.current.appendChild(renderer.domElement)
        window.addEventListener('resize', handleResize)
        start()
    
        controls.current = { start, stop }
        controls.control = new OrbitControls( camera, renderer.domElement );
        controls.scene = scene;
        controls.camera = camera;

        // handle props
        handleProps(props);

        
        return () => {
            stop()
            window.removeEventListener('resize', handleResize)
            mount.current?.removeChild(renderer.domElement) // allows for navigation away from page
    
        }
    }, [])
    
    useEffect(() => {
    if (isAnimating) {
        controls.current.start()
    } else {
        controls.current.stop()
    }
    }, [isAnimating])

    handleProps(props);
       
    return <div className="vis" ref={mount} />
}