import * as THREE from 'three';

export function transformPlacement(placement, dimensions) {
    const factor = 0.5;
    return {
        x: placement.x + factor * dimensions.x,
        y: placement.y + factor * dimensions.y,
        z: placement.z + factor * dimensions.z,
    }
}

export function generateBox(dim, color, transparent=false) {
    const geometry = new THREE.BoxGeometry(dim.x, dim.y, dim.z)
    const material = new THREE.MeshBasicMaterial({ color, transparent, opacity: 0 }); // opacity 0 only becomes active if transparent = true
    const cube = new THREE.Mesh(geometry, material)

    const edgeGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
    const mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    const edges = new THREE.LineSegments( edgeGeometry, mat );
    return [cube, edges];
}

export function generatePackagesFromContent(content) {
    const packages = [];

    for (let _package of content) {
        const _p = {
            dimensions: {
                x: _package.xEnd + 1 - _package.x, 
                y: _package.yEnd + 1 - _package.y,
                z: _package.zEnd + 1 - _package.z,
            },
            placement: {
                x: _package.x, 
                y: _package.y,
                z: _package.z,
            },
        }
        packages.push(_p);
    }
    
    return packages
}

export function dimensionEqual(dim1, dim2) {
    if (dim1 == dim2) return true;

    return (
        dim1.x === dim2.x &&
        dim1.y === dim2.y &&
        dim1.z === dim2.z
    )

}