import { styled, Dialog as MuiDialog, InputLabel, Select, TextField } from "@mui/material";
import { DataGrid, gridClasses } from '@mui/x-data-grid'

export const Dialog = styled(MuiDialog)(({}) => ({
    '& .MuiDialog-paper': {
        overflowY: "unset"
    },
}));

export const styledDataGrid = {
    borderWidth: 'unset!important',
    borderStyle: 'none!important'
}

export const StripedDataGrid = styled(DataGrid)(({}) => ({
    width: '96%',
    margin: '0 auto',
    minWidth: '800px',
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: '#ededed',
    },
    [`& .${gridClasses.row}.odd`]: {
        backgroundColor: '#e4e4e4'
    },
    [`& .MuiDataGrid-columnHeader`]: {
        borderBottom: '1px solid', // Uma borda inferior sólida
        fontSize: 14,
        fontWeight: 400,
    },
    [`& .MuiDataGrid-virtualScroller`]: {
        marginTop: '6px'
    },
    [`& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer`]: {
        display: "none"
    },
    [`& .MuiDataGrid-actionsCell`]: {
        gap: '0px'
    },
    '--DataGrid-overlayHeight': '300px'
}))

export const CssInputLabel = styled(InputLabel)({
    color: "#000000",
    fontSize: '14px',
    "&.Mui-focused": {
        color: "#000000",
    },
})

export const CssSelect = styled(Select)({
    "&:after": {
        borderColor: "#000000",
    },
    "&:before": {
        borderColor: "#000000"
    },
    ".MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000",
    },
    ".MuiSelect-icon": {
        color: "#000000"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000000",
    },
})

export const CssTextField = styled(TextField)(({}) => ({
    "& label": {
        color: "#000000",
        fontSize: '14px',
        fontWeight: '400',
    },
    "& label.Mui-focused": {
        color: "#000000",
    },
    "& .MuiInput-underline:before": {
        borderColor: "#000000",
    },
    "& .MuiInput-underline:after": {
        borderColor: "#000000",
    },
    "& .MuiInput-root": {
        "& fieldset": {
            borderColor: "#000000",
        },
        "&:hover fieldset": {
            borderColor: "#000000",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#000000",
        },
    }
}))