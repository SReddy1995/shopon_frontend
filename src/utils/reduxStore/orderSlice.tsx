import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        selectedOrder : null,
        sourcePage: '',
        ordersListFilters: {
            order_id: null,
            customer_name: null,
            payment_status: null,
            order_status: null,
            fulfillment_status: null,
            from_date: null,
            to_date: null
        }
    },
    reducers: {
        updateSelectedOrder: (state, action) => {
            localStorage.setItem('selected_order', JSON.stringify(action.payload))
            state.selectedOrder = action.payload
        },
        updateOrdersListFilters: (state, action) => {
            state.ordersListFilters = action.payload
        }
    }
})

export const { updateSelectedOrder, updateOrdersListFilters} = orderSlice.actions;

export default orderSlice.reducer;