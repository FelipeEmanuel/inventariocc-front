import * as Yup from 'yup'

/**
 * @class
 * @category Validators
 */
export class ProdutosValidator {

    private static _name: Yup.StringSchema<string> = Yup.string()
        .required('É necessário colocar um nome para o produto!')

    private static _type: Yup.StringSchema<string> = Yup.string()
        .required('É necessário escolher um tipo para o produto!')

    static get validationScheme(): Yup.ObjectSchema<object> {
        return Yup
            .object()
            .shape({
                name: this.name,
                type: this.type,
            })
    }


    static get name(): Yup.StringSchema<string> {
        return this._name
    }

    static get type(): Yup.StringSchema<string> {
        return this._type
    }

}