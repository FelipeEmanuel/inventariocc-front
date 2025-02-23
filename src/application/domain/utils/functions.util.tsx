import { Box, TablePaginationProps, Typography } from "@mui/material";
import { gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import MuiPagination from '@mui/material/Pagination';
import FolderIcon from '@mui/icons-material/Folder';

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