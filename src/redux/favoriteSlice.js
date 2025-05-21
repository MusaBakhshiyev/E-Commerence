import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("favoriteItems")) || [],
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addToFavorite(state, action) {
            const { product } = action.payload;
            const existing = state.items.find(item => item.id === product.id);

            if (!existing) {
                state.items.push(product);
            }
            localStorage.setItem("favoriteItems", JSON.stringify(state.items));
        },
        removeFromFavorite(state, action) {
            state.items = state.items.filter(item => item.id != action.payload);
            localStorage.setItem("favoriteItems", JSON.stringify(state.items));
        },
    }
})

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;