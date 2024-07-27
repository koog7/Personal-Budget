import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";
import {RootState} from "../../app/store.ts";

export interface CategoryProps{
    id?: string;
    type: string;
    name: string;
}
export interface TransactionProps {
    id?: string;
    category: string;
    amount: number;
    createAt: string;
}
interface CategoryState {
    categories: CategoryProps[];
    transaction: TransactionProps[]
    loading: boolean;
    error: boolean;
}

const initialState: CategoryState = {
    categories: [],
    transaction: [],
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

export const getTransaction = createAsyncThunk<TransactionProps[], void, {state: RootState}>('transactions/getTransaction', async () => {
    try {
        const response = await axiosAPI.get(`/finance/transaction.json`);
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

export const postTransaction = createAsyncThunk<TransactionProps, TransactionProps>('transactions/postTransaction', async (transaction) => {
    try {
        const response = await axiosAPI.post('/finance/transaction.json', transaction);
        return { ...transaction, id: response.data.name };
    } catch (error) {
        console.error('Error:', error);
    }
});

export const deleteTransaction = createAsyncThunk<string, string, { state: RootState }>('transactions/deleteTransaction', async (id:string) => {
    try {
        await axiosAPI.delete(`/finance/transaction/${id}.json`);
        return id;
    }catch (error) {
        console.error('Error:', error);
    }
});

export const deleteCategory = createAsyncThunk<string, string, { state: RootState }>('categories/deleteCategory', async (id:string) => {
    try {
        await axiosAPI.delete(`/finance/categories/${id}.json`);
        return id;
    }catch (error) {
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
            }).addCase(getCategory.rejected, (state:CategoryState) => {
                state.loading = false;
                state.error = false;
            }).addCase(getTransaction.pending, (state:CategoryState) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getTransaction.fulfilled, (state:CategoryState, action: PayloadAction<TransactionProps[]>) => {
                state.transaction = action.payload;
                state.loading = false;
            })
            .addCase(getTransaction.rejected, (state:CategoryState) => {
                state.loading = false;
                state.error = true;
            }).addCase(deleteTransaction.pending, (state: CategoryState) => {
                state.loading = true;
                state.error = false;
            }).addCase(deleteTransaction.fulfilled, (state: CategoryState, action: PayloadAction<string>) => {
                state.loading = false;
                state.transaction = state.transaction.filter(order => order.id !== action.payload);
            }).addCase(deleteTransaction.rejected, (state: CategoryState) => {
                state.loading = false;
                state.error = true;
            }).addCase(deleteCategory.pending, (state: CategoryState) => {
                state.loading = true;
                state.error = false;
            }).addCase(deleteCategory.fulfilled, (state: CategoryState, action: PayloadAction<string>) => {
                state.loading = false;
                state.categories = state.categories.filter(order => order.id !== action.payload);
            }).addCase(deleteCategory.rejected, (state: CategoryState) => {
                state.loading = false;
                state.error = true;
            });
    },
})

export const FinanceReducer = FinanceSlice.reducer;