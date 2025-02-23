
import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType, IAxiosResponse, IPaginator } from '../root.types'
import { produtosActions } from '.'
import { Produtos } from '../../application/domain/models/entity/produtos'
import { ProdutosTypes } from './types'
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

const produtosSaga = function* () {
    yield all([
        takeLatest(ProdutosTypes.PRODUTOS_REQUEST, getProdutos),
    ])
}

export default produtosSaga
