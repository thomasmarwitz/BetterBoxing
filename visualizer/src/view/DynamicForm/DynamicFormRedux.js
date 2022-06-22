import { TextField, Button, Typography, Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequestDataBox, deleteLastRequestBox, fetchBoxData, selectRequestDataBoxes, setRequestDataBoxAttr } from "../../store/apiSlice/apiSlice";

const findById = (arr, id) => {
    return arr.filter(el => el.id === id)[0];
}

export function DynamicFormRedux(props) {
    const formState = useSelector(selectRequestDataBoxes);

    const dispatch = useDispatch();

    const formBoxLine = (id) => ([
        <TextField onChange={(e) => dispatch(setRequestDataBoxAttr({id, key: "count", val: e.target.value}))} id={`count-${id}`} key={`count-${id}`} label="Count" variant="outlined" value={findById(formState, id).count}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBoxAttr({id, key: "x", val: e.target.value}))} id={`x-${id}`} key={`x-${id}`} label="x" variant="outlined" value={findById(formState, id).x}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBoxAttr({id, key: "y", val: e.target.value}))} id={`y-${id}`} key={`y-${id}`} label="y" variant="outlined" value={findById(formState, id).y}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBoxAttr({id, key: "z", val: e.target.value}))} id={`z-${id}`} key={`z-${id}`} label="z" variant="outlined" value={findById(formState, id).z}/>,
        <TextField onChange={(e) => dispatch(setRequestDataBoxAttr({id, key: "weight", val: e.target.value}))} id={`weight-${id}`} key={`weight-${id}`} label="Weight" variant="outlined" value={findById(formState, id).weight}/>,
    ]);

    const handleAddRow = () => {
        dispatch(addRequestDataBox({}));
    }

    const deleteLastRow = () => {
        dispatch(deleteLastRequestBox());
    }

    return (<>
            <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>{props.title}</Typography>
            <Box
                component="form"
                style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", columnGap: "1%", rowGap: "10px"}}
            >
                {formState.map(state => formBoxLine(state.id))}
                
            </Box>



            <div style={{display: 'grid', gridTemplateColumns: '15% 15% 3% 14% 34% 14%', columnGap: "1%"}}>
                <Button 
                    variant="contained" 
                    onClick={deleteLastRow}
                    sx={{marginTop: `10px`, marginRight: "1%"}}
                    color="error"
                    disabled={formState.length === 0}
                    >
                    Delete Last Box Type
                </Button>

                <Button 
                    variant="contained" 
                    onClick={handleAddRow}
                    sx={{marginTop: `10px`, marginRight: "1%"}}
                    >
                    Add Box Type
                </Button> 
                
                <div></div>
                
                <Button 
                    variant="contained" 
                    onClick={() => dispatch(fetchBoxData())}
                    sx={{marginTop: `10px`, marginRight: "1%"}}
                    >
                    Scan Next Box
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