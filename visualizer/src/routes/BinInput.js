import { FormControl, InputLabel, Select, MenuItem, Input, Typography } from "@mui/material";
import React from "react";
import { DynamicForm } from "../view/DynamicForm/DynamicForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetBoxes, selectRequestDataAlgorithm, selectRequestDataBinLimit, selectRequestDataBins, setRequestDataAlgorithm, setRequestDataBinLimit, setRequestDataBins } from "../store/apiSlice/apiSlice";
import { DynamicFormReduxBins } from "../view/DynamicForm/DynamicFormReduxBins";

export function BinInput() {
    const algorithm = useSelector(selectRequestDataAlgorithm);
    const binLimit = useSelector(selectRequestDataBinLimit);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = () => {
        let numeralBinLimit;
        try {
            numeralBinLimit = parseInt(binLimit);
        } catch (e) {
            alert("Bin Limit has to be a number")
            return;
        }
        dispatch(setRequestDataBinLimit(numeralBinLimit));

        //dispatch(resetBoxes());
        navigate("/boxes-loading");
    }

    return (<>
        <FormControl fullWidth sx={{marginBottom: "1%"}}>
            <InputLabel id="demo-simple-select-label">Algorithm Strategy</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={algorithm}
                label="Algorithm Strategy"
                onChange={(event) => dispatch(setRequestDataAlgorithm(event.target.value))}
                >
                <MenuItem value={'LARGEST_AREA_FIT_FIRST'}>Largest Area Fit First</MenuItem>
                <MenuItem value={'BRUTEFORCE'}>Brute Force</MenuItem>
            </Select>
        </FormControl>
        
        <>
            <Typography>Bin Limit:</Typography>
            <Input value={binLimit} onChange={(event) => dispatch(setRequestDataBinLimit(event.target.value))}/>
        </>
        
        <DynamicFormReduxBins title={"Specify Bins"} onSubmit={onSubmit}/>
    </>);
}