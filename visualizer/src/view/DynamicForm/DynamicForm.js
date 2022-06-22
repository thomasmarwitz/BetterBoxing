import { TextField, Button, Typography, Box } from "@mui/material";
import React, { useEffect } from "react";

export function DynamicForm(props) {
    
    const formBoxLine = (id) => ([
        <TextField id={`count-${id}`} key={`count-${id}`} label="Count" variant="outlined"/>,
        <TextField id={`x-${id}`} key={`x-${id}`} label="x" variant="outlined"/>,
        <TextField id={`y-${id}`} key={`y-${id}`} label="y" variant="outlined"/>,
        <TextField id={`z-${id}`} key={`z-${id}`} label="z" variant="outlined"/>,
        <TextField id={`weight-${id}`} key={`weight-${id}`} label="Weight" variant="outlined"/>,
    ]);

    
    //const initialState = props.initialState.length === 0 ? formBoxLine(0) : [...Array(props.initialState.length).keys()].map(num => formBoxLine(num)).flat();

    const [formState, setFormState] = React.useState(formBoxLine(0));

    const handleSubmit = () => {
        let boxes = [];
        let idCounter = 0;
        for (let i = 0; i < Math.floor(formState.length / 5); ++i) {
            const box = {id: idCounter};
            for (let key of ["x", "y", "z", "weight", "count"]) {
                box[key] = parseInt(document.getElementById(`${key}-${i}`).value);
            }
            boxes.push(box);
            idCounter++;
        }
        
        boxes = boxes.filter(obj => {
            
            for (let val of Object.values(obj)) {
                if (isNaN(val)) return false;
            }

            return true;
        })

        props.handleSubmittedData(boxes);
        
    }

    const handleAddRow = () => {
        const newId = Math.floor(formState.length / 5);
        setFormState([...formState, ...formBoxLine(newId)]);
    }

    return (<>
            <Typography sx={{fontSize: "2rem", fontWeight: "700"}}>{props.title}</Typography>
            <Box
                component="form"
                style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", columnGap: "1%", rowGap: "10px"}}
            >
                {formState}
                
            </Box>

            <Button 
                variant="contained" 
                onClick={handleAddRow}
                sx={{marginTop: `10px`, marginRight: "1%"}}
                >
                Add Box Type
            </Button> 

            <Button 
                
                variant="contained" 
                onClick={handleSubmit}
                sx={{marginTop: `10px`, type: "submit"}}
                color="success"
                >
                Submit
            </Button> 
        </>
    )
}