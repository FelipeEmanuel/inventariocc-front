import { Box, Button, IconButton, InputAdornment, MenuItem, Popover, TablePaginationProps, Tooltip, Typography } from "@mui/material";
import { gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import MuiPagination from '@mui/material/Pagination';
import FolderIcon from '@mui/icons-material/Folder';
import React from "react";
import { Close, KeyboardArrowDown } from "@mui/icons-material"
import { CssSelect, CssTextField } from "./styles.util";

export function Pagination({
    page,
    onPageChange,
    className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as any, newPage - 1);
            }}
        />
    );
}

export function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export function CustomNoRowsOverlay() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                mt: 2,
                color: 'text.secondary'
            }}
        >
            <FolderIcon sx={{ fontSize: 100, mb: 1, color: '#4F638C' }} />
            <Typography fontSize="18px" color='#4F638C'>Nenhum dado foi encontrado.</Typography>
        </Box>
    );
}

export function BasicPopover(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined
    const { title, value, onChange, inputComponent, disabled, error, artigo } = props
    return (
        <React.Fragment>
            <Tooltip title={value || ''}>
                <span>
                    <Button
                        aria-describedby={id}
                        disabled={disabled}
                        variant={value ? 'contained' : 'outlined'}
                        sx={{
                            width: "250px",
                            height: "35px",
                            borderRadius: '20px',
                            borderColor: '#d32f2f',
                            backgroundColor: value ? '#d32f2f': '',
                            color: value ? 'white.main' : '#d32f2f'
                        }}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDown />}>
                        {title}
                    </Button>
                </span>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                color='primary'
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",

                }}
            >
                <Box p={1}>
                    <CssTextField
                        id="standard-basic"
                        label={artigo ? `Digite aqui ${artigo} ${title}` : `Digite aqui o ${title}`}
                        variant="standard"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={value}
                        error={error}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            onChange(event.target.value)
                        }}
                        InputProps={{
                            inputComponent,
                            endAdornment: value ? (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => onChange("")}>
                                        <Close />
                                    </IconButton>
                                </InputAdornment>
                            ) : undefined,
                        }}
                    />
                </Box>
            </Popover>
        </React.Fragment>
    )
}

export function SelectPopover(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    )

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? "simple-popover" : undefined

    const { title, value, onChange, options, placeholder, disabled, translate } = props

    return (
        <React.Fragment>
            <Tooltip title={value ? translate(value) : ''}>
                <Button
                    aria-describedby={id}
                    size="small"
                    disabled={disabled}
                    variant={value ? 'contained' : 'outlined'}
                    sx={{
                        width: "250px",
                        height: "35px",
                        borderRadius: '20px',
                        borderColor: '#d32f2f',
                        backgroundColor: value ? '#d32f2f': '',
                        color: value ? 'white.main' : '#d32f2f'
                    }}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDown />}
                >
                    {title}
                </Button>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                color='primary'
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box p={1}>
                    <CssSelect
                        size="small"
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        displayEmpty
                        renderValue={(selected: any) => {
                            if (!selected) {
                                return placeholder
                            }
                            return translate(selected)
                        }}
                        endAdornment={
                            value ? (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => onChange("")}>
                                        <Close />
                                    </IconButton>
                                </InputAdornment>
                            ) : undefined
                        }>
                        {
                            options
                                .map((value: string) => {
                                    return <MenuItem value={value} key={value}>
                                        {translate(value)}
                                    </MenuItem>
                                })
                        }
                    </CssSelect>
                </Box>
            </Popover>
        </React.Fragment >
    )
}