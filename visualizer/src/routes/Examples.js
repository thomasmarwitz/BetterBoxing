import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { fetchBinData, setRequestDataAlgorithm, setRequestDataBinLimit, setRequestDataBins, setRequestDataBoxes } from "../store/apiSlice/apiSlice";
import { useNavigate } from "react-router-dom";

const exReq1 = {
    bins: [{
        id: 1,
        x: 215,
        y: 70,
        z: 166,
        count: 1,
        maxWeight: 1000,
        emptyWeight: 1,
    }],
    boxes: [{
        id: 1,
        x: 144,
        y: 53,
        z: 115,
        count: 1,
        weight: 1,
    },
    {
        id: 2,
        x: 142,
        y: 51,
        z: 92,
        count: 1,
        weight: 1,
    }],
    algorithm: "BRUTEFORCE",
    binLimit: 1,
}


export function Examples() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadEx = (exDat) => {
            dispatch(setRequestDataBins(exDat.bins));
            dispatch(setRequestDataBoxes(exDat.boxes));
            dispatch(setRequestDataAlgorithm(exDat.algorithm));
            dispatch(setRequestDataBinLimit(exDat.binLimit));
            dispatch(fetchBinData());
            navigate("/packing-loading");
    }

    return (<>
        <Typography variant="h2" sx={{textAlign: "center"}}>Bin Packing Examples</Typography>
        <div style={{display: "grid", placeItems: "center", gridTemplateRows: "repeat(2, fr)", rowGap: "10px", margin: "10px"}}>
            <Button onClick={() => loadEx(exReq1)} variant="outlined">Example 1</Button>
            <Button onClick={() => loadEx(exReq1)} variant="outlined" disabled>Example 2</Button>
        </div>
    </>);
}