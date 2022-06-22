import { TextField, Button, Typography, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmptyRequestDataBin, deleteLastRequestBin, fetchBoxData, selectRequestDataBins, setRequestDataBinAttr } from "../../store/apiSlice/apiSlice";

const findById = (arr, id) => {
    return arr.filter(el => el.id === id)[0];
}

export function DynamicFormReduxBins(props) {
    const formState = useSelector(selectRequestDataBins);

    const dispatch = useDispatch();

    const formBoxLine = (id) => ([
        <TextField onChange={(e) => dispatch(setRequestDataBinAttr({id, key: "count", val: e.target.value}))} id={`count-${id}`} key={`count-${id}`} label="Count" variant="outlined" value={findById(formState, id).count}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBinAttr({id, key: "x", val: e.target.value}))} id={`x-${id}`} key={`x-${id}`} label="x" variant="outlined" value={findById(formState, id).x}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBinAttr({id, key: "y", val: e.target.value}))} id={`y-${id}`} key={`y-${id}`} label="y" variant="outlined" value={findById(formState, id).y}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBinAttr({id, key: "z", val: e.target.value}))} id={`z-${id}`} key={`z-${id}`} label="z" variant="outlined" value={findById(formState, id).z}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBinAttr({id, key: "maxWeight", val: e.target.value}))} id={`maxWeight-${id}`} key={`maxWeight-${id}`} label="Max Weight" variant="outlined" value={findById(formState, id).maxWeight}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBinAttr({id, key: "emptyWeight", val: e.target.value}))} id={`emptyWeight-${id}`} key={`emptyWeight-${id}`} label="Empty Weight" variant="outlined" value={findById(formState, id).emptyWeight}/>,
    ]);

    const handleAddRow = () => {
        dispatch(addEmptyRequestDataBin());
    }

    const deleteLastRow = () => {
        dispatch(deleteLastRequestBin());
    }

    return (<>
            <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>{props.title}</Typography>
            <Box
                component="form"
                style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: "1%", rowGap: "10px"}}
            >
                {formState.map(state => formBoxLine(state.id))}
                
            </Box>
            
            <div style={{display: 'grid', gridTemplateColumns: '15% 15% 57% 10%', columnGap: "1%"}}>
                <Button 
                    variant="contained" 
                    onClick={deleteLastRow}
                    sx={{marginTop: `10px`, marginRight: "1%"}}
                    color="error"
                    disabled={formState.length === 0}
                    >
                    Delete Last Bin Type
                </Button> 

                <Button 
                    variant="contained" 
                    onClick={handleAddRow}
                    sx={{marginTop: `10px`, marginRight: "1%"}}
                    >
                    Add Bin Type
                </Button> 

                <div></div>

                <Button 
                    
                    variant="contained" 
                    onClick={props.onSubmit}
                    sx={{marginTop: `10px`, type: "submit"}}
                    color="success"
                    >
                    Submit
                </Button> 
            </div>
        </>
    )
}