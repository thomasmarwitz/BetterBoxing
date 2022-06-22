import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentBinNumber, selectCurrentPackage, selectNumberTotalBins, setCurrentBin, selectHasNext } from "../store/packagingSlice/packagingSlice";
import { Item } from "../helper/styleHelper";
import { CurrentPackage } from "../view/CurrentPackage/CurrentPackage";
import { AllPackages } from "../view/AllPackages/AllPackages";
import { Controls } from "../view/Controls/Controls";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function BinPacking() {
    const box = useSelector(selectCurrentPackage);
    const currentBinNum = useSelector(selectCurrentBinNumber) + 1;
    const totalBinNum = useSelector(selectNumberTotalBins);
    const hasNext = useSelector(selectHasNext);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showBackToHome = currentBinNum >= totalBinNum && !hasNext

    return (<>
        <div style={{display: 'grid', gridTemplateColumns: '10% 10% 10%', columnGap: "35%"}}>
            <Button 
                variant="contained"
                disabled={currentBinNum <= 1}
                onClick={() => dispatch(setCurrentBin({currentBin: currentBinNum-2}))}
            >
                {"<<"}
            </Button>
            {
                showBackToHome ? 
                <Button variant="contained" onClick={() => navigate("/")}>Back Home</Button>
                : <Typography>{`Bin ${currentBinNum} / ${totalBinNum}`}</Typography>
            }
            <Button 
                variant="contained"
                disabled={currentBinNum >= totalBinNum}
                onClick={() => dispatch(setCurrentBin({currentBin: currentBinNum}))}
            >
                {">>"}
            </Button>
        </div>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item><CurrentPackage currentPackage={box}/></Item>
            <Item><AllPackages /></Item>
        </Box>
        
        <Controls />
        
    </>);
}