import React from 'react'
import { IMask, IMaskInput } from 'react-imask'

interface CustomProps {
    readonly name: string

    onChange: (event: { target: { name: string; value: string } }) => void
}

const CurrencyMaskOptions: any = {
    mask: Number,
    scale: 2,  // digits after point, 0 for integers
    thousandsSeparator: '.',  // any single char
    padFractionalZeros: true,  // if true, then pads zeros at end to the length of scale
    // normalizeZeros: false,  // appends or removes zeros at ends
    radix: ',',  // fractional delimiter
    // // mapToRadix: [','],  // symbols to process as radix   
}

const masked: any = IMask.createMask(CurrencyMaskOptions)

export const CurrencyMasked = ({ value }) => {

    masked.resolve(value)

    return masked.value
}

const TextFieldMaskCurrency: React.ForwardRefExoticComponent<CustomProps & React.RefAttributes<HTMLInputElement>> = React.forwardRef(
    (props, ref) => {
        const { onChange, ...other } = props
        return (
            <IMaskInput
                {...other}
                mask={CurrencyMaskOptions.mask}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite={true}
            />
        )
    }
)

export default TextFieldMaskCurrency