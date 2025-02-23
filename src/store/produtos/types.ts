import { Produtos } from '../../application/domain/models/entity/produtos'
import { AsyncStateStatus, IPaginator } from '../root.types'

export enum ProdutosTypes {
    PRODUTOS_RESET = '@produtos/produtosReset',
    PRODUTOS_REQUEST = '@produtos/produtosRequest',
    PRODUTOS_SUCCESS = '@produtos/produtosSuccess',
    PRODUTOS_FAILURE = '@produtos/produtosFailure',
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

interface IProdutosState {
    status: AsyncStateStatus
    data: any[]
    paginator: IPaginator
}

export interface ProdutosState {
    list: IProdutosState
}