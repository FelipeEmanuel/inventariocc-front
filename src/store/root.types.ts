
import { Action, ThunkAction } from '@reduxjs/toolkit'

import store from './index'

export enum AsyncStateStatus {
    INITIAL = 'INITIAL',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

export interface IActionType<T = any> extends Action {
    payload: T
    error: boolean
    meta: any
}

export interface IPaginator {
    page: number
    pageSize: number
    rowCount: number
    search: ISearch[]
}

export interface ISearch {
    key: string
    value: string
}

export interface IAxiosResponse<T = any> {
    data: T
    headers: any
}

export type ApplicationState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, Action<string>>
