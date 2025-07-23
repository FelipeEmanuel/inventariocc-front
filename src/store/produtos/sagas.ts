
import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType, IAxiosResponse, IPaginator } from '../root.types'
import { produtosActions } from '.'
import { Produtos } from '../../application/domain/models/entity/produtos'
import { IActionCreateSuccess, IActionRemoveRequest, IActionUpdateSuccess, ProdutosTypes } from './types'
import produtosService from '../../services/produtos'

export function* getProdutos(action: IActionType<{ paginator: IPaginator }>) {
    const { produtosSuccess, produtosFailure } = produtosActions
    const { paginator } = action.payload
    try {
        const data: IAxiosResponse<Produtos[]> =
            yield apply(produtosService, produtosService.getProdutos, [paginator])
        yield put(produtosSuccess(data))
    } catch (error) {
        yield put(produtosFailure())
    }
}

export function* create(action: IActionType<IActionCreateSuccess>) {
    const { createSuccess, createFailure } = produtosActions
    //const { openSnackBar } = SnackbarActions

    try {
        const { data } = action.payload
        const response: Produtos = yield apply(
            produtosService,
            produtosService.create,
            [data]
        )
        yield put<any>(createSuccess({ data: response }))
    } catch (e: any) {
        yield put(createFailure())
    }

}

export function* update(action: IActionType<IActionUpdateSuccess>) {
    const { updateSuccess, updateFailure } = produtosActions
    try {
        const { data } = action.payload
        console.log(action.payload)
        const response: Produtos = yield apply(
            produtosService,
            produtosService.update,
            [data]
        )
        yield put<any>(updateSuccess({ data: response }))
    } catch (e: any) {
        yield put(updateFailure())
    }
}

export function* remove(action: IActionType<IActionRemoveRequest>) {
    const { removeSuccess, removeFailure } = produtosActions
    try {
        const { id } = action.payload
        yield apply(
            produtosService,
            produtosService.remove,
            [id]
        )
        yield put<any>(removeSuccess({id}))
    } catch (e) {
        yield put(removeFailure())
    }
}


const produtosSaga = function* () {
    yield all([
        takeLatest(ProdutosTypes.PRODUTOS_REQUEST, getProdutos),
        takeLatest(ProdutosTypes.CREATE_REQUEST, create),
        takeLatest(ProdutosTypes.UPDATE_REQUEST, update),
        takeLatest(ProdutosTypes.REMOVE_REQUEST, remove)
    ])
}

export default produtosSaga
