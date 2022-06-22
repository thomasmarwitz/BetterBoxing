import axios from 'axios';

export const baseUrlBinPacking = "http://localhost:8080"
export const baseUrlBoxScanning = "http://127.0.0.1:5000"

const timeoutVal = 5 * 60 * 1000 // 5 minutes

const getFromAPI = (endpoint) => {
    return axios.get(baseUrlBoxScanning + endpoint, { timeout: timeoutVal });
}

const postAtAPI = (endpoint, data) => {
    // don't pack "data" in an object, the api accepts only an array of values (e.g. model list)
    return axios.post(baseUrlBinPacking + endpoint, data, { timeout: timeoutVal }); 
}

export const postBinPacking = (data) => {
    return postAtAPI(
        "/pack",
        data
    );
}

export const getScannedBox = () => {
    return getFromAPI(
        "/scan_single_box"
    )
}