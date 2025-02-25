import { ChangeEvent, Component, ReactNode } from "react";
import FormatNumber from "../formatters/number";
import { InputAdornment } from "@mui/material";
import { CssTextField } from "../../application/domain/utils/styles.util";

class TextFieldCurrency extends Component<any> {
    public render(): ReactNode {
        return <CssTextField
            {...this.props}
            InputProps={{
                ...(this.props?.InputProps || {}),
                startAdornment: <InputAdornment position='start'>
                    R$
                </InputAdornment>
            }}

            value={FormatNumber.format(this.props?.value ? this.props?.value : 0)}
            onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                const currentValue: number | undefined = e?.target?.value ?
                    FormatNumber.strToNumber(e.target.value)
                    : undefined
                this.props.onChange(currentValue)
            }}
            onKeyDown={(e: any) => {
                const ctrlPressed: boolean = e.ctrlKey || e.metaKey
                const keyPressed: string = e?.key
                if (
                    new RegExp(/[~`!@#$%^&()_={}[\]:;,.<>+/?\-\\*]|[a-z]|[A-Z]/)
                        .test(keyPressed) &&
                    keyPressed?.length === 1 &&
                    !(ctrlPressed && ['a', 'c', 'v'].includes(keyPressed))
                ) {
                    e?.preventDefault()
                    e?.stopPropagation()
                    return
                }
            }} />
    }
}

export default TextFieldCurrency