
import {Scene} from "./SceneAllPackages";
import { useSelector } from "react-redux";
import { selectCurrentBinDimensions, selectPlacedPackages } from "../../store/packagingSlice/packagingSlice";
import { generateBox, transformPlacement } from "../../helper/boxHelper";

export function AllPackages() {

    const currentBinDims = useSelector(selectCurrentBinDimensions);
    const newBin = generateBox(currentBinDims, 0x000000, true);
    
    const objects = useSelector(selectPlacedPackages);
    objects.boxes.push(...newBin);
    const origin = {x: 0, y: 0, z: 0};
    
    objects.placement.push(transformPlacement(origin, currentBinDims), transformPlacement(origin, currentBinDims));
    //objects.placement = objects.placement.map(); // transform back

    return (<>
            <Scene 
                height={600} 
                width={550} 
                objects={objects} 
                bin={currentBinDims} 
                style={{minWidth: "100%", minHeight: "100%"}} 
                camera={{x: currentBinDims.x * 1.25, y: 0, z: currentBinDims.z * 0.5}}
            />
        </>
    );
}
