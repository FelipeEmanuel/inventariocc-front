
import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { IActionType, IAxiosResponse, IPaginator } from '../root.types'
import { produtosActions } from '.'
import { Produtos } from '../../application/domain/models/entity/produtos'
import { IActionCreateSuccess, IActionUpdateSuccess, ProdutosTypes } from './types'
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
        /*yield put(
            openSnackBar({
                type: SnackBarMessageType.SUCCESS,
                title: 'Success title',
                message: 'Cadastro concluído com sucesso!'
            })
        )*/
    } catch (e: any) {
        if (e?.response?.data?.code !== 409) {
            /*yield put(
                openSnackBar({
                    type: SnackBarMessageType.ERROR,
                    title: 'Error',
                    message: 'Não foi possível concluir o cadastro, por favor, tente novamente.'
                })
            )*/
        } else if (e?.response?.data?.code === 409) {
            if(e?.response?.data?.message === 'A block already registered!') {
                /*yield put(
                    openSnackBar({
                        type: SnackBarMessageType.ERROR,
                        title: 'Error',
                        message: 'Não foi possível concluir o cadastro, já existe um bloqueio com esses dados!'
                    })
                )*/
            }
        }
        yield put(createFailure())
    }

}

export function* update(action: IActionType<IActionUpdateSuccess>) {
    const { updateSuccess, updateFailure } = produtosActions
    //const { openSnackBar } = SnackbarActions
    try {
        const { data } = action.payload
        console.log(action.payload)
        const response: Produtos = yield apply(
            produtosService,
            produtosService.update,
            [data]
        )
        yield put<any>(updateSuccess({ data: response }))
        /*yield put(
            openSnackBar({
                type: SnackBarMessageType.SUCCESS,
                title: 'Success title',
                message: 'Bloqueio atualizado com sucesso!'
            })
        )*/
    } catch (e: any) {
        if (e?.response?.data?.code !== 409) {
            /*yield put(
                openSnackBar({
                    type: SnackBarMessageType.ERROR,
                    title: 'Error',
                    message: 'Não foi possível atualizar o bloqueio!'
                })
            )*/
        } else if (e?.response?.data?.code === 409) {
            if(e?.response?.data?.message === 'A block already registered!') {
                /*yield put(
                    openSnackBar({
                        type: SnackBarMessageType.ERROR,
                        title: 'Error',
                        message: 'Não foi possível atualizar o bloqueio, já existe um bloqueio com esses dados!'
                    })
                )*/
            }
        }
        yield put(updateFailure())
    }
}


const produtosSaga = function* () {
    yield all([
        takeLatest(ProdutosTypes.PRODUTOS_REQUEST, getProdutos),
        takeLatest(ProdutosTypes.CREATE_REQUEST, create),
        takeLatest(ProdutosTypes.UPDATE_REQUEST, update)
    ])
}

export default produtosSaga
