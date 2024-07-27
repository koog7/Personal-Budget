import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";
import {RootState} from "../../app/store.ts";

export interface CategoryProps{
    id?: string;
    type: string;
    name: string;
}

interface CategoryState {
    categories: CategoryProps[];
    loading: boolean;
    error: boolean;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: false,
}
export const getCategory = createAsyncThunk<CategoryProps[], void, {state: RootState}>('categories/getCategory', async () => {
    try {
        const response = await axiosAPI.get(`/finance/categories.json`);
        return Object.keys(response.data).map(key => ({...response.data[key], id: key}));
    } catch (error) {
        console.error('Error:', error);
    }
});
export const postCategory = createAsyncThunk<CategoryProps, CategoryProps>('categories/postCategory', async (newCategory) => {
    try {
        const response = await axiosAPI.post('/finance/categories.json', newCategory);
        return { ...newCategory, id: response.data.name };
    } catch (error) {
        console.error('Error:', error);
    }
});

export const FinanceSlice = createSlice({
    name:'finance',
    initialState,
    reducers: {
        consoleLogger: (state) => {
            console.log(state.categories)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postCategory.pending, (state:CategoryState) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(postCategory.fulfilled, (state:CategoryState, action) => {
                state.categories.push(action.payload);
                state.loading = false;
            })
            .addCase(postCategory.rejected, (state:CategoryState) => {
                state.loading = false;
                state.error = false;
            }).addCase(getCategory.pending, (state:CategoryState) => {
                state.loading = true;
                state.error = false;
            }).addCase(getCategory.fulfilled, (state:CategoryState, action:PayloadAction<CategoryProps[]>) => {
                state.categories = action.payload;
                state.loading = false;
                console.log(state.categories)
            }).addCase(getCategory.rejected, (state:CategoryState) => {
                state.loading = false;
                state.error = false;
            });
    },
})

export const FinanceReducer = FinanceSlice.reducer;