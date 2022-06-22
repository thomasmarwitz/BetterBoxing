import { createSlice, createAction } from "@reduxjs/toolkit";
import { getScannedBox, postBinPacking } from "../../client/client";
import { dimensionEqual } from "../../helper/boxHelper";
import { setCurrentBin, setResponseData } from "../packagingSlice/packagingSlice";

const findById = (arr, id) => {
    return arr.filter(el => el.id === id)[0];
}

const initialState = {
    requestData: {
        bins: [{
            id: 0,
            x: 215,
            y: 70,
            z: 166,
            count: 1,
            maxWeight: 1000,
            emptyWeight: 1,
        }],
        items: [
            {
                id: 0,
                x: 144,
                y: 53,
                z: 115,
                count: 1,
                weight: 1,
            },
            {
                id: 1,
                x: 142,
                y: 51,
                z: 92,
                count: 1,
                weight: 1,
            }
        ],
        algorithm: "LARGEST_AREA_FIT_FIRST",
        binLimit: 1,
    },
    response: {
        data: null,
        loading: null,
        error: null,
    },
    boxResponse: {
        data: null,
        loading: null,
        error: null,
    }
}

const fetchBinDataPending = createAction("api/fetchBinData/pending");
const fetchBinDataSuccess = createAction("api/fetchBinData/success");
const fetchBinDataRejected = createAction("api/fetchBinData/rejected");

const fetchBoxDataPending = createAction("api/fetchBoxData/pending");
const fetchBoxDataSuccess = createAction("api/fetchBoxData/success");
const fetchBoxDataRejected = createAction("api/fetchBoxData/rejected");


export const fetchBoxData = () => {

    return (dispatch) => {
        
        dispatch(fetchBoxDataPending());

        return getScannedBox().then(
            response => {
                dispatch(fetchBoxDataSuccess({data: response.data}));
                dispatch(addRequestDataBox({
                    x: response.data[0], 
                    y: response.data[2], // this is height
                    z: response.data[1],
                })); // already add box, once its fetched
                
            },
            error => dispatch(fetchBoxDataRejected({error: error.message})),
        );

    }

}

export const fetchBinData = () => {

    return (dispatch, getState) => {
        const requestData = getState().api.requestData;
        
        dispatch(fetchBinDataPending());
        dispatch(setCurrentBin({currentBin: 0}));

        return postBinPacking(requestData).then(
            response => {
                dispatch(fetchBinDataSuccess({data: response.data}));
                dispatch(setResponseData({data: response.data}));
            },
            error => dispatch(fetchBinDataRejected({error: error.message})),
        );

    }

}

const apiSlice = createSlice({
    name: "api", 
    initialState,
    reducers: {
        setRequestDataAlgorithm(state, action) {
            state.requestData.algorithm = action.payload;
        },
        setRequestDataBinLimit(state, action) {
            state.requestData.binLimit = action.payload;
        },
        addRequestDataBox(state, action) {
            const box = action.payload;
            for (let item of state.requestData.items) {
                if (dimensionEqual(item, box)) {
                    item.count++;
                    return;
                }
            }

            state.requestData.items.push({
                id: state.requestData.items.length,
                x: box.x,
                y: box.y,
                z: box.z,
                count: 1,
                weight: 1,
            })
        },
        addEmptyRequestDataBin(state, action) {

            state.requestData.bins.push({
                id: state.requestData.bins.length,
                x: "",
                y: "",
                z: "",
                count: 1,
                weight: 1,
            });
        },
        deleteLastRequestBin(state, action) {
            state.requestData.bins.pop();
        },
        deleteLastRequestBox(state, action) {
            state.requestData.items.pop();
        },
        setRequestDataBins(state, action) {
            state.requestData.bins = action.payload;
        },
        setRequestDataBoxAttr(state, action) {
            const {id, key, val} = action.payload;
            const item = findById(state.requestData.items, id);
            const parse = parseInt(val)
            item[key] = isNaN(parse) ? 0 : parse;
        },
        
        setRequestDataBinAttr(state, action) {
            const {id, key, val} = action.payload;
            const item = findById(state.requestData.bins, id);
            const parse = parseInt(val)
            item[key] = isNaN(parse) ? 0 : parse;
        },

        setRequestDataBoxes(state, action) {
            state.requestData.items = action.payload;
        },
        resetBoxes(state, action) {
            state.requestData.items = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBinDataPending, (state, action) => {
                state.response.loading = true;
            })
            .addCase(fetchBinDataSuccess, (state, action) => {
                state.response.loading = false;
                state.response.data = action.payload.data;
            })
            .addCase(fetchBinDataRejected, (state, action) => {
                state.response.loading = false;
                state.response.error = action.payload.error;
            })
            .addCase(fetchBoxDataPending, (state, action) => {
                state.boxResponse.data = null;
                state.boxResponse.loading= true;
            })
            .addCase(fetchBoxDataSuccess, (state, action) => {
                state.boxResponse.loading = false;
                state.boxResponse.data = action.payload;
            })
            .addCase(fetchBoxDataRejected, (state, action) => {
                state.boxResponse.loading= false;
                state.boxResponse.data = null;
                state.boxResponse.error = action.error.message;
            })
    }
});

export default apiSlice.reducer;

export const {
    setRequestDataAlgorithm,
    setRequestDataBinLimit,
    setRequestDataBins,
    setRequestDataBoxes,
    addRequestDataBox,
    setRequestDataBoxAttr,
    setRequestDataBinAttr,
    addEmptyRequestDataBin,
    deleteLastRequestBin,
    deleteLastRequestBox,
    resetBoxes
} = apiSlice.actions;

export const selectRequestDataAlgorithm = state => state.api.requestData.algorithm;
export const selectRequestDataBinLimit = state => state.api.requestData.binLimit;
export const selectRequestDataBins = state => state.api.requestData.bins;
export const selectRequestDataBoxes = state => state.api.requestData.items;
export const selectResponse = state => state.api.response;
export const selectBoxResponse = state => state.api.boxResponse;
export const selectRequestDataBoxById = (state, id) => state.api.requestData.items[id];