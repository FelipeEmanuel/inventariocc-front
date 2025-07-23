import { Box, Button, Tooltip, Typography } from '@mui/material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useState } from 'react';
import { ProductType } from '../../../application/domain/utils/material.type';
import { BasicPopover, SelectPopover } from '../../../application/domain/utils/functions.util';
import DeleteIcon from '@mui/icons-material/Delete'
import { t } from 'i18next';

export default function ProdutoFilters(props: any) {

    const { toggle, produtosRequest, paginator } = props

    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("")

    const handleClear = () => {
        setName("")
        setType("")
    }


    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="flex-start" alignItems={'center'}>
                <Typography sx={{ fontSize: '12px', padding: '5px', color: '#4F638C', fontWeight: 700 }}>FILTROS</Typography>
                <CancelRoundedIcon sx={{ fontSize: "18px", color: '#4F638C', cursor: 'pointer', alignItems: 'center', }} onClick={toggle} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box p={0.5}>
                    <BasicPopover
                        title="Nome do Produto"
                        value={name}
                        artigo={'o'}
                        onChange={(newValue: string) => {
                            setName(newValue);
                            produtosRequest({
                                paginator: {
                                    ...paginator, search: [
                                        { key: 'name', value: newValue },
                                        { key: 'type', value: type },
                                    ]
                                }
                            })
                        }}
                    />
                </Box>

                <Box p={0.5}>
                    <SelectPopover
                        title="Tipo do Produto"
                        value={type}
                        placeholder={'SELECIONE O TIPO'}
                        options={Object.keys(ProductType)}
                        onChange={(newValue: string) => {
                            setType(newValue);
                            produtosRequest({
                                paginator: {
                                    ...paginator, search: [
                                        { key: 'name', value: name },
                                        { key: 'type', value: newValue },
                                    ]
                                }
                            })
                        }}
                        translate={(selectedValue: string) => `${t(`MATERIAL_TYPE.${selectedValue.toUpperCase()}`)}`}
                    />
                </Box>

                <Box>
                    <Tooltip title="Limpar filtros" placement="top">
                        <Button>
                            <DeleteIcon
                                onClick={() => {
                                    handleClear()
                                    produtosRequest({
                                        paginator: {
                                            ...paginator, search: [
                                                { key: 'name', value: '' },
                                                { key: 'type', value: '' },
                                            ]
                                        }
                                    })
                                }}
                                size="26px"
                                sx={{color:'#d32f2f'}}
                            />
                        </Button>
                    </Tooltip>
                </Box>

            </Box>
        </Box>
    )
}