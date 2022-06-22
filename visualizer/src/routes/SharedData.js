import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setResponseData } from "../store/packagingSlice/packagingSlice";

export function SharedData() {
    const [searchParams, setSearchParams] = useSearchParams();
    const enc = searchParams.get("data")
    const dec = JSON.parse(atob(enc));
    const dispatch = useDispatch();
    dispatch(setResponseData({data: dec}));
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate("/bin-packing");
    });

    return <>You are being forwarded</>
}