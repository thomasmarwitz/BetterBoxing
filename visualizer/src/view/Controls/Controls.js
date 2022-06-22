import { Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../helper/styleHelper";
import { selectAmountLeftBoxes, selectAmountPlacedBoxes, selectCurrentBinDimensions, selectCurrentPackage, selectCurrentPackageRaw, selectHasNext, selectHasPrev, setNext, setPrev } from "../../store/packagingSlice/packagingSlice";

export function Controls() {

    const dispatch = useDispatch();

    const packageRaw = useSelector(selectCurrentPackageRaw);
    const binDims = useSelector(selectCurrentBinDimensions)
    const hasNext = useSelector(selectHasNext);
    const hasPrev = useSelector(selectHasPrev);
    const amountLeft = useSelector(selectAmountLeftBoxes);
    const amountPlaced = useSelector(selectAmountPlacedBoxes);

    const handleNext = () => {
        dispatch(setNext());
    }
    
    const handlePrev = () => {
        dispatch(setPrev());
    }

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    <Button 
                        variant="contained" 
                        onClick={() => handlePrev()}
                        sx={{margin: 1}}
                        disabled={!hasPrev}
                        >
                        Previous Step
                    </Button> 
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
                        <Typography>{`${amountPlaced} / ${amountPlaced + amountLeft}`}</Typography>
                    </div>
                    <Button 
                        variant="contained" 
                        onClick={() => handleNext()}
                        sx={{margin: 1}}
                        disabled={!hasNext}
                        >
                        Next Step
                    </Button>   
                </div>
            </Item>
            <Item>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>

                    <Typography>Package x: {packageRaw.dimensions.x}</Typography>
                    <Typography>Bin x: {binDims.x}</Typography>
                    <Typography>Package y: {packageRaw.dimensions.y}</Typography>
                    <Typography>Bin y: {binDims.y}</Typography>
                    <Typography>Package z: {packageRaw.dimensions.z}</Typography>
                    <Typography>Bin z: {binDims.z}</Typography>

                </div>
            </Item>
        </Box>
    )
}