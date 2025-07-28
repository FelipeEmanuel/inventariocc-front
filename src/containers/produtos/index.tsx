import React, { Component } from 'react'
import { Box, Button, Theme, Tooltip, Typography } from '@mui/material'
import AppBar from '../../components/layout/app.bar'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { ApplicationState, AsyncStateStatus, IPaginator } from '../../store/root.types'
import { produtosActions } from '../../store/produtos'
import { connect } from 'react-redux'
import { Produtos } from '../../application/domain/models/entity/produtos'
import { IActionCreateSuccess, IActionProduto, IActionProdutoRequest, IActionRemoveRequest, IActionUpdateSuccess } from '../../store/produtos/types'
import { StripedDataGrid, styledDataGrid } from '../../application/domain/utils/styles.util'
import { CustomNoRowsOverlay, CustomPagination } from '../../application/domain/utils/functions.util'
import { GridActionsCellItem, GridCellParams, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { CurrencyMasked } from '../../components/masks/currency'
import AddProdutoDialog from '../../components/dialogs/addProdutoDialog'
import ProdutoFilters from '../../components/filters/produtos'
import { t } from 'i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteDialog from '../../components/dialogs/deleteDialog'
import { Stats } from '../../application/domain/models/entity/stats'

const LayoutStyle = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        backgroundColor: theme.palette.background.default
    }
})

interface IProps {
    status: AsyncStateStatus
    data: Produtos[]
    paginator: IPaginator
    statsStatus: AsyncStateStatus
    statsData: Stats
}

interface IDispatch {
    produtosReset(): void

    produtosRequest(data: IActionProdutoRequest): void

    produtosStatsRequest(): void

    createReset(): void

    createRequest(data: IActionCreateSuccess): void

    updateReset(): void

    updateRequest(data: IActionUpdateSuccess): void

    removeRequest(data: IActionRemoveRequest): void
}

interface IState {
    readonly open: boolean
    readonly selectedRow: Produtos | null
    readonly filtersOpen: boolean
    readonly openModalDelete: boolean
}

type IJoinProps = IProps & IDispatch & WithStyles<typeof LayoutStyle, true>

class ProdutosComponent extends Component<IJoinProps, IState> {

    constructor(props: IJoinProps) {
        super(props)

        this.state = {
            open: false,
            selectedRow: null,
            filtersOpen: false,
            openModalDelete: false
        }

        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleFilters = this.toggleFilters.bind(this)
    }

    private handleOpen = (row: Produtos) => this.setState({ open: true, selectedRow: new Produtos().fromJSON(row) })
    private handleClose = () => this.setState({ open: false, selectedRow: null })
    private handleModalDelete = (row: Produtos) => this.setState({ openModalDelete: true, selectedRow: new Produtos().fromJSON(row) })

    private toggleFilters() {
        this.setState((prevState) => ({
            filtersOpen: !prevState.filtersOpen,
        }));
    }

    public componentDidMount() {
        const { produtosRequest, produtosStatsRequest, paginator } = this.props
        document.title = `INVENTÁRIO CASA CLÁUDIO`
        produtosRequest({ paginator: paginator as any })
        produtosStatsRequest()
    }

    public render() {

        const { classes, data, statsData, paginator, produtosRequest } = this.props
        const { filtersOpen, open, selectedRow, openModalDelete } = this.state

        const columns: GridColDef[] = [
            {
                field: 'name',
                headerName: 'Nome do Produto',
                flex: 1,
                headerAlign: 'center',
                align: 'center',
                sortable: true,
            },
            {
                field: 'qtd',
                headerName: 'Quantidade',
                flex: 1,
                headerAlign: 'center',
                align: 'center',
                sortable: true,
                renderCell: (params: GridCellParams) => {
                    if (params?.row?.qtd) {
                        return (
                            <Typography>
                                {params?.row?.qtd}
                            </Typography>
                        )
                    } else {
                        return (
                            <Typography>
                                0
                            </Typography>
                        )
                    }
                }
            },
            {
                field: 'price',
                headerName: 'Preço Unidade',
                flex: 1,
                headerAlign: 'center',
                align: 'center',
                sortable: true,
                renderCell: (params: GridCellParams) => {
                    if (params?.row?.price) {
                        return (
                            <Box display="flex" justifyContent="center" gap="3px" alignItems="center" width="100%">
                                <Typography>
                                    R$
                                </Typography>
                                <Typography>
                                    {CurrencyMasked({ value: `${params?.row?.price}`.replace(/[.]/, ',') })}
                                </Typography>
                            </Box>
                        )
                    } else {
                        return (
                            <Typography>
                                - -
                            </Typography>
                        )
                    }
                }
            },
            {
                field: 'totalPrice',
                headerName: 'Preço Total',
                flex: 1,
                headerAlign: 'center',
                align: 'center',
                sortable: true,
                renderCell: (params: GridCellParams) => {
                    if (params?.row?.totalPrice) {
                        return (
                            <Box display="flex" justifyContent="center" gap="3px" alignItems="center" width="100%">
                                <Typography>
                                    R$
                                </Typography>
                                <Typography>
                                    {CurrencyMasked({ value: `${params?.row?.totalPrice}`.replace(/[.]/, ',') })}
                                </Typography>
                            </Box>
                        )
                    } else {
                        return (
                            <Typography>
                                - -
                            </Typography>
                        )
                    }
                }
            },
            {
                field: 'type',
                headerName: 'Tipo do Produto',
                flex: 1,
                headerAlign: 'center',
                align: 'center',
                sortable: true,
                renderCell: (params: GridCellParams) => {
                    if (params?.row?.type) {
                        return t(`MATERIAL_TYPE.${params?.row?.type?.toUpperCase()}`)
                    }
                }
            },
            {
                field: 'acoes',
                headerName: 'Ações',
                flex: 0.2,
                headerAlign: 'center',
                align: 'center',
                type: 'actions',

                getActions: (params: GridRowParams) => [
                    <GridActionsCellItem
                        icon={
                            <Tooltip title="Excluir o Produto" placement="top">
                                <DeleteIcon sx={{ color: 'black' }} />
                            </Tooltip>
                        }
                        label="Excluir o Produto"
                        onClick={() => {
                            this.handleModalDelete(params?.row)
                        }}
                    />,
                ]
            }
        ]

        const rows = data.map((produto: Produtos) => produto.toJSON())


        console.log(statsData)
        return <React.Fragment>
            <Box className={classes.root}>
                <AppBar />
                <Box display="flex" flexDirection="row" justifyContent="space-between" width='96%' margin="0 auto" paddingTop="20px" paddingBottom="20px" marginTop='15px' marginBottom='15px'>
                    <Box>
                        {!filtersOpen && (
                            <Button
                                id="btn_enter"
                                type="submit"
                                variant="outlined"
                                onClick={this.toggleFilters}
                                sx={{ width: 218, height: 42, fontSize: 15, fontWeight: 700, borderRadius: '14px' }}
                                color="error"
                            >
                                FILTROS
                            </Button>
                        )}
                        {filtersOpen && (

                            <ProdutoFilters
                                toggle={this.toggleFilters}
                                onClick={(filters: any) => produtosRequest({ paginator: { ...paginator, search: filters } })}
                                produtosRequest={produtosRequest}
                                paginator={paginator}
                            />
                        )}
                    </Box>

                    <Tooltip title="Adicionar um novo credor" placement="top">
                        <Button
                            id="btn_enter"
                            variant="contained"
                            sx={{ width: 218, height: 42, fontSize: 15, fontWeight: 700, borderRadius: '14px' }}
                            color='error'
                            onClick={() => this.handleOpen(new Produtos())}
                        >
                            ADICIONAR
                        </Button>
                    </Tooltip>
                </Box>
                <Box display="flex" flexDirection="column" width='96%' margin="0 auto" paddingBottom="20px" marginTop='15px' marginBottom='15px'>
                    <Typography fontSize="20px" fontWeight={700} color="#000">
                        Quantidade de Produtos Cadastrados: {statsData?.count}
                    </Typography>
                    <Typography fontSize="20px" fontWeight={700} color="#000">
                        Quantidade de Produtos em Estoque: {statsData?.totalQtd}
                    </Typography>
                    <Box display="flex" gap="3px" alignItems="center" width="100%">
                        <Typography fontSize="20px" fontWeight={700} color="#000">
                            Valor Total dos Produtos: R$
                        </Typography>
                        <Typography fontSize="20px" fontWeight={700} color="#000">
                            {CurrencyMasked({ value: `${statsData?.totalValue}`.replace(/[.]/, ',') })}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <StripedDataGrid
                        rows={rows}
                        rowHeight={37}
                        onRowClick={(params) => this.handleOpen(params.row)}
                        sx={styledDataGrid}
                        columns={columns}
                        columnHeaderHeight={40}
                        rowCount={paginator.rowCount}
                        paginationModel={paginator}
                        paginationMode="server"
                        onPaginationModelChange={(page: any) => produtosRequest({ paginator: { ...page, search: [...paginator.search] } })}
                        disableColumnMenu={true}
                        pageSizeOptions={[1, 10, 20, 50]}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }
                        slots={{
                            pagination: CustomPagination,
                            noRowsOverlay: CustomNoRowsOverlay
                        }}
                        slotProps={{
                            pagination: {
                                labelRowsPerPage: "Itens por Página",
                            },
                        }}
                    />
                </Box>
            </Box>

            <AddProdutoDialog
                open={open}
                selectedRow={selectedRow}
                onClose={this.handleClose}
                handleSubmit={this.handleSubmit}
            />

            <DeleteDialog
                open={openModalDelete}
                not={() => this.setState({ openModalDelete: false, selectedRow: null })}
                yes={() => {
                    this.handleDelete(selectedRow)
                    this.setState({ openModalDelete: false, selectedRow: null })
                }}
            />

        </React.Fragment>

    }

    private handleSubmit(data: IActionProduto): void {
        const { createRequest, updateRequest } = this.props
        const { selectedRow } = this.state
        !data.price ? data.price === 0 : data.price
        !data.qtd ? data.qtd === 0 : data.qtd
        const price: number = parseFloat(`${data?.price}`.replace(/[,]/, '.'))
        const produto: Produtos = new Produtos().fromJSON({ ...data, price })
        if (selectedRow && selectedRow.id) {
            produto.id = selectedRow.id
            console.log(produto)
            updateRequest({ data: produto })
        } else {
            createRequest({ data: produto })
        }

        this.handleClose()

    }

    private handleDelete(data: any): void {
        const { selectedRow } = this.state
        const { removeRequest } = this.props
        const produto: Produtos = new Produtos().fromJSON(data)
        if (selectedRow && selectedRow.id) {
            produto.id = selectedRow?.id
            removeRequest({ id: produto.id })
        }
    }
}

const ProdutosList: any = withStyles<any>(LayoutStyle, { withTheme: true })(ProdutosComponent)

const mapStateToProps = (state: ApplicationState) => ({
    status: state.produtos.list.status,
    data: state.produtos.list.data,
    paginator: state.produtos.list.paginator,
    statsStatus: state.produtos.stats.status,
    statsData: state.produtos.stats.data
})

const mapDispatchToProps = {
    ...produtosActions
}

const ProdutosWithRedux = connect(mapStateToProps, mapDispatchToProps)(ProdutosList)

export default ProdutosWithRedux
