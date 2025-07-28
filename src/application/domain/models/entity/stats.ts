import { JsonUtils } from '../../utils/json.util'

export class Stats {

    private _count: number | undefined
    private _totalQtd: number | undefined
    private _totalValue: number | undefined
    
    get count(): number | undefined {
        return this._count
    }
    
    set count(value: number | undefined) {
        this._count = value
    }
    
    get totalQtd(): number | undefined {
        return this._totalQtd
    }

    set totalQtd(value: number | undefined) {
        this._totalQtd = value
    }


    get totalValue(): number | undefined {
        return this._totalValue
    }

    set totalValue(value: number | undefined) {
        this._totalValue = value
    }

    public fromJSON(json: any): Stats {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJsonString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.count !== undefined) {
            this.count = Number(json.count)
        }

        if (json.totalQtd !== undefined) {
            this.totalQtd = Number(json.totalQtd)
        }

        if (json.totalValue !== undefined) {
            this.totalValue = Number(json.totalValue)
        }

        return this
    }

    public toJSON(): any {
        return {
            count: this.count ?? 0,
            totalQtd: this.totalQtd ?? 0,
            totalValue: this.totalValue ?? 0,
        }
    }
}