import { Box, Button, Dialog, DialogContent, Fab, FormControl, Typography } from '@mui/material'
import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from "@mui/icons-material/Close";

export default function DeleteDialog(this: any, props: any) {

    const { open, not, yes } = props
    
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={(_event, reason) => {
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                      return;
                    }
                    not();
                }}
                scroll="body"
                aria-labelledby="dialog-check-block"
                aria-describedby="dialog-check-block"
                maxWidth="xs"
                fullWidth={true}
                PaperProps={{
                    style: {
                      borderRadius: '14px',
                    }
                  }}
            >
                <DialogContent>
                    <Box>
                        <Box display="flex" justifyContent="flex-end">
                            <CloseIcon onClick={not} fontSize='medium' sx={{ color: 'black', cursor: 'pointer' }} />
                        </Box>
                        <Box display="flex" alignItems='center' gap='10px'>
                            <FormControl>
                                <Fab
                                    id="btn_print"
                                    color="primary"
                                    sx={{ 
                                        backgroundColor: '#d32f2f', 
                                        width: 23,
                                        height: 23,
                                        minWidth: 23,
                                        minHeight: 23,
                                    }}
                                >
                                    <DeleteForeverIcon sx={{ fontSize: 15, color: "#ecedf4ff" }} />
                                </Fab>
                            </FormControl>
                            <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "#d32f2f" }}>DELETAR PRODUTO</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" gap="20px" padding="30px 0px 20px">
                            <Typography sx={{ fontWeight: 400, fontSize: "14px", color: "#000" }}>Tem certeza que deseja deletar esse produto?</Typography>
                            <Typography sx={{ fontWeight: 400, fontSize: "14px", color: "#000" }}>Essa ação é irreversível.</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" flexDirection="row" gap="15px">
                            <Button variant="contained" color="primary" onClick={not}
                                sx={{
                                    borderRadius: "14px",
                                    backgroundColor: "#e48282",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    width: "68px",
                                    height: "42px",
                                }}  
                            >
                                NÃO
                            </Button>
                            <Button variant="contained" onClick={yes}
                                sx={{
                                    borderRadius: "14px",
                                    backgroundColor: "#d32f2f",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    width: "68px",
                                    height: "42px",
                                }}  
                            >
                                SIM
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}