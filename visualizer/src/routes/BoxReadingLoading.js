import { CircularProgress, Typography } from "@mui/material";
import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBoxData, selectBoxResponse, addRequestDataBox, selectRequestDataBoxes, fetchBinData } from "../store/apiSlice/apiSlice";
import { DynamicFormRedux } from "../view/DynamicForm/DynamicFormRedux";

const dimValid = (dim) => {
    return (dim.x && dim.y && dim.z);
}

function BoxReadingLoading() {
    const response = useSelector(selectBoxResponse);
    const items = useSelector(selectRequestDataBoxes);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const testReq = () => {
        dispatch(fetchBoxData());
    }

    const handleSubmit = () => {
        if (items.filter(item => !dimValid(item)).length > 0) {
            alert("Please fill in the missing gaps")
        } else {
            dispatch(fetchBinData());
            navigate("/packing-loading");
        }
    }

    let content;
    if (response.loading) {
        content = <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <CircularProgress size={100}/> 
            <Typography sx={{margin: "1%"}}>Scanning Box</Typography>
        </div>;
    } else if (response.data) {
        content = <DynamicFormRedux onSubmit={handleSubmit} title={"Input Boxes"}/>
    } else if (response.error) {
        content = <>{`Error occurred: ${response.error}`}</>;
    } else {
        
        
        content = <DynamicFormRedux onSubmit={handleSubmit} title={"Specify Boxes"}/> //<button onClick={() => testReq()}>Simulate req</button>
    }

    return content;
}

export default memo(BoxReadingLoading, () => true);