import {createSlice} from "@reduxjs/toolkit";

interface CategoryProps{
    type: string;
    name: string;
}

interface CategoryState {
    categories: CategoryProps[];
}

const initialState: CategoryState = {
    categories: [],
}

export const FinanceSlice = createSlice({
    name:'finance',
    initialState,
    reducers: {
        consoleLogger: (state) => {
            console.log(state.categories)
        },
    },

})

export const FinanceReducer = FinanceSlice.reducer;