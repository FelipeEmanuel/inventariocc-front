import { JsonUtils } from '../../utils/json.util'
import { Entity } from "./entity";

export class Produtos extends Entity {

    private _name: string | undefined
    private _qtd: number | undefined
    private _price: number | undefined
    private _type: string | undefined
    private _totalPrice: number | undefined

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }
    
    get qtd(): number | undefined {
        return this._qtd
    }
    
    set qtd(value: number | undefined) {
        this._qtd = value
    }
    
    get price(): number | undefined {
        return this._price
    }

    set price(value: number | undefined) {
        this._price = value
    }

    get type(): string | undefined {
        return this._type
    }

    set type(value: string | undefined) {
        this._type = value
    }

    get totalPrice(): number | undefined {
        return this._totalPrice
    }

    set totalPrice(value: number | undefined) {
        this._totalPrice = value
    }

    public fromJSON(json: any): Produtos {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.id !== undefined) {
            this.id = json.id
        }

        if (json.created_at !== undefined) {
            this.created_at = json.created_at
        }

        if (json.updated_at !== undefined) {
            this.updated_at = json.updated_at
        }

        if (json.name !== undefined) {
            this.name = json.name
        }

        if (json.qtd !== undefined) {
            this.qtd = Number(json.qtd)
        }

        if (json.price !== undefined) {
            this.price = Number(json.price)
        }

        if (json.type !== undefined) {
            this.type = json.type
        }

        if (json.totalPrice !== undefined) {
            this.totalPrice = Number(json.totalPrice)
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id || undefined,
            created_at: this.created_at || undefined,
            updated_at: this.updated_at || undefined,
            name: this.name ? this.name : undefined,
            qtd: this.qtd ? this.qtd : 0,
            price: this.price ? this.price : 0,
            type: this.type ? this.type : undefined,
            totalPrice: this.totalPrice ? this.totalPrice : 0,
        }
    }
}