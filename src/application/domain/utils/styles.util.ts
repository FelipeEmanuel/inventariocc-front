import { styled } from "@mui/material";
import { DataGrid, gridClasses } from '@mui/x-data-grid'

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