
import * as THREE from 'three';
import React from 'react';

export function SceneSpinningPackage(props) {
    const { useRef, useEffect, useState } = React
    const mount = useRef(null)
    const [isAnimating, setAnimating] = useState(true)
    const controls = useRef(null)

    
    useEffect(() => {
        let width = mount.current.clientWidth;
        let height = mount.current.clientHeight || props.height;
        let frameId;
    
        const scene = new THREE.Scene({background: 0xffffff})
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = 400;
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        // remove later


        const geometry = new THREE.BoxGeometry( 200, 200, 200 );
        const material = new THREE.MeshBasicMaterial( { color: "#DEB887" } );

        const wireframe = new THREE.WireframeGeometry( geometry );
        const line = new THREE.LineSegments( wireframe );
        line.material.color = "#000000";

        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        scene.add(line);

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

            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            line.rotation.x += 0.005;
            line.rotation.y += 0.01;

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
        controls.scene = scene;



        
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
       
    return <div className="vis" ref={mount}/>
}