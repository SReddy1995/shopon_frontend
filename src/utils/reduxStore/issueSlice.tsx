import { createSlice } from "@reduxjs/toolkit";


const issueSlice = createSlice({
    name: 'issue',
    initialState: {
        selectedItem : null,
        selectedIssue: null
    },
    reducers: {
        updateSelectedItemInfo: (state, action) => {
            localStorage.setItem('selected_item', JSON.stringify(action.payload))
            state.selectedItem = action.payload
        },
        updateSelectedIssueInfo: (state, action) => {
            localStorage.setItem('selected_issue', JSON.stringify(action.payload))
            state.selectedIssue = action.payload
        }
    }
})

export const { updateSelectedItemInfo, updateSelectedIssueInfo } = issueSlice.actions;

export default issueSlice.reducer;