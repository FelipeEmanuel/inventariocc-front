import { Produtos } from '../../application/domain/models/entity/produtos'
import { AsyncStateStatus, IPaginator } from '../root.types'

export enum ProdutosTypes {
    PRODUTOS_RESET = '@produtos/produtosReset',
    PRODUTOS_REQUEST = '@produtos/produtosRequest',
    PRODUTOS_SUCCESS = '@produtos/produtosSuccess',
    PRODUTOS_FAILURE = '@produtos/produtosFailure',

    CREATE_RESET = '@produtos/createReset',
    CREATE_REQUEST = '@produtos/createRequest',
    CREATE_SUCCESS = '@produtos/createSuccess',
    CREATE_FAILURE = '@produtos/createFailure',

    UPDATE_RESET = '@produtos/updateReset',
    UPDATE_REQUEST = '@produtos/updateRequest',
    UPDATE_SUCCESS = '@produtos/updateSuccess',
    UPDATE_FAILURE = '@produtos/updateFailure',
}

export interface IActionProduto {
    readonly name: string
    readonly qtd: number
    readonly price: number
    readonly type: string
}

export interface IActionProdutoSuccess {
    data: Produtos[]
    headers: any
}

export interface IActionProdutoRequest {
    paginator: IPaginator
}

export interface IActionCreateSuccess {
    data: Produtos
}

export interface IActionRemoveSuccess {
    id: string
}

export interface IActionUpdateSuccess {
    data: Produtos
}

interface IProdutosState {
    status: AsyncStateStatus
    data: any[]
    paginator: IPaginator
}

interface IProdutoCreateState {
    status: AsyncStateStatus
    data: any
}

interface IProdutoRemoveState {
    status: AsyncStateStatus
    id: string
}

interface IProdutoUpdateState {
    status: AsyncStateStatus
    data: any
}

export interface ProdutosState {
    list: IProdutosState
    create: IProdutoCreateState
    remove: IProdutoRemoveState
    update: IProdutoUpdateState
}