import axiosInstance from './axios'
import { AxiosResponse } from 'axios'
import { IAxiosResponse, IPaginator, ISearch } from '../store/root.types'
import { Produtos } from '../application/domain/models/entity/produtos'
import { Stats } from '../application/domain/models/entity/stats'


export class ProdutosService {

    constructor(private apiVersion: string = '/v1') {
    }

    /**
     * Performs the request of access tokens informing the user's credentials
     * @async
     * @public
     */
    public getProdutos(paginator: IPaginator): Promise<IAxiosResponse<Produtos[]>> {

        const params = new URLSearchParams()

        if (paginator) {

            if (paginator.page) {
                params.append('page', String(paginator.page + 1))
            }

            if (paginator.pageSize) {
                params.append('limit', String(paginator.pageSize))
            }

            paginator
                ?.search
                ?.forEach((searchItem: ISearch) => {
                    if (searchItem.key && searchItem.value) {
                        params.append(searchItem.key, `*${searchItem.value}*`)
                    }
                })

        }

        return axiosInstance
            .get(`${this.apiVersion}/produtos`, { params })
            .then((response: AxiosResponse<any>) => {
                return {
                    data: response.data.map((item: any) => new Produtos().fromJSON(item)),
                    headers: response.headers
                }
            })
    }

    public async create(item: Produtos): Promise<Produtos> {
        return await axiosInstance
            .post(`${this.apiVersion}/produtos`, item.toJSON())
            .then((response: AxiosResponse<any>) =>
                new Produtos().fromJSON(response.data)
            )
    }

    public async update(item: Produtos): Promise<Produtos> {
        return await axiosInstance
            .put(`${this.apiVersion}/produtos/${item.id}`, item.toJSON())
            .then((response: AxiosResponse<any>) =>
                new Produtos().fromJSON(response.data)
            )
    }

    public remove(parecerId: string): Promise<void> {
        return axiosInstance
            .delete(`${this.apiVersion}/produtos/${parecerId}`)
    }

    public getStats(): Promise<IAxiosResponse<Stats>> {
        return axiosInstance
            .get(`${this.apiVersion}/produtos/stats`)
            .then((response: AxiosResponse<any>) => {
                return response.data
            })
    }

}

const produtosService: ProdutosService = new ProdutosService()

export default produtosService