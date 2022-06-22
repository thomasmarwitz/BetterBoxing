import { useEffect, useState } from 'react';
import { SceneCurrentPackage } from './SceneCurrentPackage';
import * as THREE from 'three';
import { useSelector } from 'react-redux';
import { selectCurrentPackageRaw } from '../../store/packagingSlice/packagingSlice';

export function CurrentPackage({currentPackage}) {
    const rawPackage = useSelector(selectCurrentPackageRaw);

    return (<>
            <SceneCurrentPackage 
                height={600} 
                width={550} 
                objects={currentPackage} 
                bin={{x: 10, y: 5, z: 8}}
                camera={{
                    x: rawPackage.dimensions.x * 1.5,
                    y: 0,
                    z: 0,
                }}    
            />
        </>
    );
}
