
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStateStatus } from "../root.types";
import { IActionProdutoRequest, IActionProdutoSuccess, ProdutosState } from "./types";


const initialState: ProdutosState = {
    list: {
        status: AsyncStateStatus.INITIAL,
        data: [],
        paginator: {
            page: 0,
            pageSize: 50,
            rowCount: 0,
            search: [{
                key: '',
                value: ''
            }]
        },
    },
}

export const produtosSlice = createSlice({
    name: '@produtos',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        produtosReset: (state: ProdutosState) => {
            state.list = initialState.list
        },
        produtosRequest: (state: ProdutosState, action: PayloadAction<IActionProdutoRequest>) => {
            state.list.status = AsyncStateStatus.LOADING
            state.list.paginator = action.payload.paginator
        },
        produtosSuccess: (state: ProdutosState, action: PayloadAction<IActionProdutoSuccess>) => {
            state.list.status = AsyncStateStatus.SUCCESS
            state.list.data = action.payload.data
            state.list.paginator.rowCount = parseInt(action.payload.headers['x-total-count'])
        },
        produtosFailure: (state: ProdutosState) => {
            state.list.status = AsyncStateStatus.FAILURE
        },
    }
})

export const produtosActions = produtosSlice.actions

export default produtosSlice.reducer