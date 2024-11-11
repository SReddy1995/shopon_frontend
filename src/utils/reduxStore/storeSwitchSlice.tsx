import { createSlice } from "@reduxjs/toolkit";


const storeSwitchSlice = createSlice({
    name: 'stores',
    initialState: {
        source : null,
        locationToLoad : null
    },
    reducers: {
        updateSource: (state, action) => {
            state.source = action.payload
        },
        updateLOcationToReload: (state, action) => {
            state.locationToLoad = action.payload
        }
    }
})

export const { updateSource, updateLOcationToReload } = storeSwitchSlice.actions;

export default storeSwitchSlice.reducer;