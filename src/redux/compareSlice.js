import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("compareItems")) || [],
}

const compareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        addToCompare(state, action) {
            const { product } = action.payload;
            const existing = state.items.find(item => item.id === product.id);

            if (!existing) {
                state.items.push(product);
            }
            localStorage.setItem("compareItems", JSON.stringify(state.items));
        },
        removeFromCompare(state, action) {
            state.items = state.items.filter(item => item.id != action.payload);
            localStorage.setItem("compareItems", JSON.stringify(state.items));
        },
    }
})

export const { addToCompare, removeFromCompare } = compareSlice.actions;
export default compareSlice.reducer;