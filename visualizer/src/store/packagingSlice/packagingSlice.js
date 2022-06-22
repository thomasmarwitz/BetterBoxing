import { createSlice } from "@reduxjs/toolkit";
import { generateBox, generatePackagesFromContent, transformPlacement } from "../../helper/boxHelper";
import { getColor } from "../../helper/colors";


const packages = [
    {
        dimensions: {
            x: 1, 
            y: 1,
            z: 1,
        },
        placement: {
            x: 0, 
            y: 0,
            z: 0,
        },
    },
    {
        dimensions: {
            x: 1, 
            y: 2,
            z: 1,
        },
        placement: {
            x: 1, 
            y: 1,
            z: 1,
        },
    },
    {
        dimensions: {
            x: 1, 
            y: 1,
            z: 2,
        },
        placement: {
            x: 2, 
            y: 2,
            z: 2,
        },
    },
]

const initialState = {

    bins: [{
        packages, // list of objects

        bin: {
            dimensions: {
                x: 10,
                y: 8,
                z: 12,    
            },

            filledUntil: -1, // index, -1 = empty
        }
    }],
    
    currentBin: 0
}

const packagingSlice = createSlice({
    name: "packaging",
    initialState,
    reducers: {
        setNext(state, action) {
            const currentBin = state.currentBin;
            if (state.bins[currentBin].bin.filledUntil < state.bins[currentBin].packages.length -1) state.bins[currentBin].bin.filledUntil++;
        },

        setPrev(state, action) {
            const currentBin = state.currentBin;
            if (state.bins[currentBin].bin.filledUntil >= 0) state.bins[currentBin].bin.filledUntil--;
        },
        
        setResponseData(state, action) {
            const { data } = action.payload;
            
            if (!data.success) return;

            state.bins = [] // clear old bin solutions
            for (let binSolution of data.packedBins) {
                
                // generate packages
                const _packages = generatePackagesFromContent(binSolution.content);
                
                state.bins.push({
                    bin: {
                        dimensions: {
                            x: binSolution.bin.x,
                            y: binSolution.bin.y,
                            z: binSolution.bin.z,
                        },
                        filledUntil: -1,
                    },
                    packages: _packages,

                });
            }


        },

        setCurrentBin(state, action) {
            const { currentBin } = action.payload;
            state.currentBin = currentBin;
        }
    }
})

export const {
    setNext,
    setPrev,
    setResponseData,
    setCurrentBin
} = packagingSlice.actions;

export default packagingSlice.reducer; // main reducer

// selectors
export const selectHasNext = state => state.packaging.bins[state.packaging.currentBin].bin.filledUntil < state.packaging.bins[state.packaging.currentBin].packages.length - 1 - 1; 

export const selectHasPrev = state => state.packaging.bins[state.packaging.currentBin].bin.filledUntil >= 0;

export const selectCurrentPackage = state => {
    const box = state.packaging.bins[state.packaging.currentBin].packages[state.packaging.bins[state.packaging.currentBin].bin.filledUntil + 1];
    return generateBox(box.dimensions, getColor(box.dimensions), false);
};

export const selectPlacedPackages = state => {
    const boxes = [];
    const placement = [];
    //state.packaging.bin.filledUntil
    const currentBin = state.packaging.currentBin;

    const maxIndex = state.packaging.bins[currentBin].bin.filledUntil + 2;
    for (let index = 0; index < maxIndex; ++index) {
        const rawBox = state.packaging.bins[state.packaging.currentBin].packages[index];
        boxes.push(...generateBox(rawBox.dimensions, getColor(rawBox.dimensions), index !== maxIndex - 1));
        const tPlacement = transformPlacement(rawBox.placement, rawBox.dimensions);
        placement.push(tPlacement, tPlacement);
    }
    return {
        boxes,
        placement,
    };
}

export const selectAmountPlacedBoxes = state => state.packaging.bins[state.packaging.currentBin].bin.filledUntil + 1 + 1; // first is alreadyd place, should we change this?

export const selectAmountLeftBoxes = state => state.packaging.bins[state.packaging.currentBin].packages.length - state.packaging.bins[state.packaging.currentBin].bin.filledUntil - 1 - 1;

export const selectCurrentBinDimensions = state => state.packaging.bins[state.packaging.currentBin].bin.dimensions;

export const selectCurrentPackageRaw = state => state.packaging.bins[state.packaging.currentBin].packages[state.packaging.bins[state.packaging.currentBin].bin.filledUntil + 1]

export const selectCurrentBinNumber = state => state.packaging.currentBin;

export const selectNumberTotalBins = state => state.packaging.bins.length;