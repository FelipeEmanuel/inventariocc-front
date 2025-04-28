import { Component } from "react";
import { Box, Button, DialogContent,  FormControl, MenuItem, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Field, Form, Formik } from "formik";
import { Produtos } from "../../../application/domain/models/entity/produtos";
import { CssInputLabel, CssSelect, CssTextField, Dialog } from "../../../application/domain/utils/styles.util";
import { ProductType } from "../../../application/domain/utils/material.type";
import FormErrorMessage from "../../form.error";
import TextFieldCurrency from "../../textfield.currency";
import { t } from "i18next";

interface IProps {  
    open: boolean
    onClose: () => void
    handleSubmit: (data: any) => void
    selectedRow: Produtos | null
}

class AddProdutoDialog extends Component<IProps> {

    public render() {

        const { open, onClose, selectedRow, handleSubmit } = this.props;

        return (
            <Dialog
                open={open}
                onClose={onClose}
                scroll='body'
                aria-labelledby="dialog-create-edit"
                aria-describedby="dialog-creditor"
                maxWidth="sm"
                fullWidth={true}
            >
                <Button
                    sx={{ 
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        width: 280,
                        height: 45,
                        top: -45,
                        left: 0,
                        backgroundColor: "#d32f2f",
                        "&:hover": {
                            backgroundColor: "#d32f2f",
                            boxShadow: "none" 
                        }
                     }}
                >
                    <Typography color="white" fontWeight={700}>CRIAÇÃO DE PRODUTO</Typography>
                </Button>
                <DialogContent sx={{ bgcolor: 'white' }}>
                    <Box display="flex" justifyContent="flex-end">
                        <CloseIcon onClick={onClose} fontSize='medium' sx={{ color: 'black', cursor: 'pointer' }} />
                    </Box>
                    {selectedRow?.id &&
                        <Box display="flex" justifyContent="flex-start" paddingBottom="30px">
                            <Typography fontSize="16px" fontWeight={700} color="black">EDITAR PRODUTO</Typography>
                        </Box>
                    }
                    <Box display="flex" flexDirection="column" width="100%" gap="10px">
                        <Formik
                            initialValues={{
                                ...selectedRow?.toJSON(),
                                created_at: selectedRow?.created_at,
                                name: selectedRow?.name || '',
                                qtd: selectedRow?.qtd || 0,
                                price: selectedRow?.price || '',
                                type: selectedRow?.type || '',
                            }}
                            onSubmit={(values, { resetForm }) => {
                                handleSubmit(values)
                                resetForm();
                            }}
                            //validationSchema={CreditorValidator.validationScheme}
                            validateOnMount={true}
                            enableReinitialize={true}
                        >
                            {({
                                values, isValid, errors, touched, setFieldValue, setFieldTouched
                            }) => (
                                <Form id="form_create_creditors">
                                    <Box display="flex" flexDirection="column" width="95%" margin="0 auto" gap='1px'>                                        
                                        <Field id='name' name='name' type="customField">
                                            {() => (
                                                <Box display="flex" justifyContent="center">
                                                    <FormControl error={!!errors.name && !!touched.name} fullWidth>
                                                        <CssTextField
                                                            id="name"
                                                            variant='standard'
                                                            label='Nome do Produto'
                                                            value={values?.name || ''}
                                                            onChange={(e: any) => { setFieldValue('name', e.target.value) }}
                                                            onBlur={() => setFieldTouched('name', true, true)}
                                                        />
                                                        <FormErrorMessage name='name'></FormErrorMessage>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>

                                        <Field id='type' name='type' type="customField">
                                            {() => (
                                                <Box display="flex" justifyContent="center">
                                                    <FormControl fullWidth variant='standard' required error={!!errors.type && !!touched.type}>
                                                        <CssInputLabel id="demo-simple-select-label" sx={{ fontSize: '14px', fontWeight: 400 }}>
                                                            Tipo do Produto
                                                        </CssInputLabel>
                                                        <CssSelect
                                                            labelId="demo-simple-select-label"
                                                            value={values?.type}
                                                            onChange={(e: any) =>
                                                                setFieldValue('type', e.target.value)}
                                                            onBlur={() => setFieldTouched('type', true, true)}>
                                                            {Object.keys(ProductType).map((value: string) => {
                                                                return <MenuItem value={value} key={value}>{t(`MATERIAL_TYPE.${value.toUpperCase()}`)}</MenuItem>
                                                            })}
                                                        </CssSelect>
                                                        <FormErrorMessage name='type'></FormErrorMessage>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>

                                        <Field id='qtd' name='qtd' type="customField">
                                            {() => (
                                                <Box display="flex" justifyContent="center">
                                                    <FormControl error={!!errors.qtd && !!touched.qtd} fullWidth>
                                                        <CssTextField
                                                            id="qtd"
                                                            variant='standard'
                                                            label="Quantidade"
                                                            value={values?.qtd || 0}
                                                            onChange={(e: any) => { setFieldValue('qtd', e.target.value) }}
                                                            onBlur={() => setFieldTouched('qtd', true, true)}
                                                        />
                                                        <FormErrorMessage name='qtd'></FormErrorMessage>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>

                                        <Field id='price' name='price' type="customField">
                                            {({ field: { name, value } }) => (
                                                <Box display="flex" justifyContent="center" width="100%">
                                                    <FormControl fullWidth>
                                                        <TextFieldCurrency
                                                            id={name}
                                                            variant='standard'
                                                            label="Preço"
                                                            error={!!errors.price && !!touched.price}
                                                            value={value}
                                                            onChange={(newValue: number | undefined) => setFieldValue(name, newValue)}
                                                            onBlur={() => setFieldTouched(name, true, true)} />
                                                        <FormErrorMessage name={name}></FormErrorMessage>
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>
                                    </Box>
                                    <Box display="flex" flexDirection="row" justifyContent="flex-end" gap="10px" padding="40px 0px 10px" width="100%" margin="0 auto"> 
                                        <FormControl>
                                            <Button
                                                id="btn_enter"
                                                variant="outlined"
                                                sx={{ width: 128, height: 42, fontSize: 15, fontWeight: 700, borderRadius: '14px', backgroundColor: "white", color: "#d32f2f", borderColor: "#d32f2f" }}
                                                onClick={onClose}
                                                type="button"
                                            >
                                                CANCELAR
                                            </Button>
                                        </FormControl>
                                        <FormControl>
                                            <Button
                                                id="btn_enter"
                                                variant="contained"
                                                sx={{ width: 128, height: 42, fontSize: 15, fontWeight: 700, borderRadius: '14px' }}
                                                color="error"
                                                onClick={() => handleSubmit(values)}
                                                disabled={!isValid}
                                            >
                                                {selectedRow?.id ? "EDITAR": "SALVAR"}
                                            </Button>
                                        </FormControl>
                                    </Box>
                                    
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </DialogContent>

            </Dialog>
        );
    }
}

export default AddProdutoDialog