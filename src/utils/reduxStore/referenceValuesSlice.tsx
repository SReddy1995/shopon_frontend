import { createSlice } from "@reduxjs/toolkit";


const referenceValuesSlice = createSlice({
    name: 'stores',
    initialState: {
        referenceList : null,
    },
    reducers: {
        updateReferenceValues: (state, action) => {
            state.referenceList = action.payload
        }
    }
})

export const { updateReferenceValues } = referenceValuesSlice.actions;

export default referenceValuesSlice.reducer;