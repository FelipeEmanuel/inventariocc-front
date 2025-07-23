
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStateStatus } from "../root.types";
import { IActionCreateSuccess, IActionProdutoRequest, IActionProdutoSuccess, IActionRemoveSuccess, IActionUpdateSuccess, ProdutosState } from "./types";
import { Produtos } from "../../application/domain/models/entity/produtos";

const initialState: ProdutosState = {
    list: {
        status: AsyncStateStatus.INITIAL,
        data: [],
        paginator: {
            page: 0,
            pageSize: 20,
            rowCount: 0,
            search: [{
                key: '',
                value: ''
            }]
        },
    },
    create: {
        status: AsyncStateStatus.INITIAL,
        data: new Produtos()
    },
    remove: {
        status: AsyncStateStatus.INITIAL,
        id: ''
    },
    update: {
        status: AsyncStateStatus.INITIAL,
        data: new Produtos()
    }
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

        createReset: (state: ProdutosState) => {
            state.create = initialState.create
        },
        createRequest: (state: ProdutosState) => {
            state.create.status = AsyncStateStatus.LOADING
        },
        createSuccess: (state: ProdutosState, action: PayloadAction<IActionCreateSuccess>) => {
            state.create.status = AsyncStateStatus.SUCCESS
            state.create.data = action.payload.data
            state.list.data = [action.payload.data, ...state.list.data]
            state.list.paginator.rowCount++
        },
        createFailure: (state: ProdutosState) => {
            state.create.status = AsyncStateStatus.FAILURE
        },

        updateReset: (state: ProdutosState) => {
            state.update = initialState.update
        },
        updateRequest: (state: ProdutosState) => {
            state.update.status = AsyncStateStatus.LOADING
        },
        updateSuccess: (state: ProdutosState, action: PayloadAction<IActionUpdateSuccess>) => {
            state.update.status = AsyncStateStatus.SUCCESS
            state.update.data = action.payload.data
            state.list.data = state.list.data.map(produto =>
                produto.id === action.payload.data.id ? action.payload.data : produto
            );
        },
        updateFailure: (state: ProdutosState) => {
            state.update.status = AsyncStateStatus.FAILURE
        },

        removeRequest: (state: ProdutosState) => {
            state.remove.status = AsyncStateStatus.LOADING
        },
        removeSuccess: (state: ProdutosState, action: PayloadAction<IActionRemoveSuccess>) => {
            state.remove.status = AsyncStateStatus.SUCCESS
            state.list.data = state.list.data.filter(produto => produto.id !== action.payload.id);
        },
        removeFailure: (state: ProdutosState) => {
            state.remove.status = AsyncStateStatus.FAILURE
        }
    }
})

export const produtosActions = produtosSlice.actions

export default produtosSlice.reducer