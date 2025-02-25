import React, { Component } from 'react'

/**
 * @private
 * @property {number} [value] Value to be formatted.
 */
interface IProps {
    readonly value?: number
    readonly fractionDigits?: number
}

/**
 * Component to format the Numeric value.
 *
 * @property {number} [value] Value to be formatted.
 *
 * @component
 * @category Components
 *
 */
class FormatNumber extends Component<IProps> {
    public static format(value?: number, minimumFractionDigits: number = 2): string {
        if (!value && value !== 0) {
            return ''
        }
        return Number(value).toLocaleString('pt-BR', { minimumFractionDigits })
    }

    public static strToNumber(str: string, digits: number = 2): number {
        const onlyDigits = str
            .split('')
            .filter(s => /\d/.test(s))
            .join('')
            .padStart(3, '0')

        const digitsFloat = onlyDigits.slice(0, digits * -1) + '.' + onlyDigits.slice(digits * -1)

        return parseFloat(digitsFloat)
    }

    constructor(props: IProps) {
        super(props)
        FormatNumber.format = FormatNumber.format.bind(this)
    }

    /**
     * Render method.
     * Triggering method to render the component.
     * @return  Component to be rendered.
     */
    public render() {
        const { value, fractionDigits } = this.props
        const valueFormatted: string = FormatNumber.format(value, fractionDigits)
        return <React.Fragment>{valueFormatted}</React.Fragment>
    }
}

export default FormatNumber