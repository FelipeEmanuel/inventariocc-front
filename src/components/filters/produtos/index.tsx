import { Box, Typography } from '@mui/material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function ProdutoFilters(props: any) {
    
    const { toggle } = props
    /*const [register_code, setRegister_code] = React.useState<string>("")
    const [office_number, setOffice_number] = React.useState<string>("")
    const [creditor_name, setCreditor_name] = React.useState<string>("")
    const [judicial_process, setJudicial_process] = React.useState<string>("")
    const [administrative_process, setAdministrative_process] = React.useState<string>("")
    const [blocking_category, setBlocking_category] = React.useState<string>("")

    const handleClear = () => {
        setOffice_number("")
        setCreditor_name("")
        setJudicial_process("")
        setAdministrative_process("")
        setRegister_code("")
        setBlocking_category("")
    }*/

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="flex-start" alignItems={'center'}>
                <Typography sx={{ fontSize: '12px', padding: '5px', color: '#4F638C', fontWeight: 700 }}>FILTROS</Typography>
                <CancelRoundedIcon sx={{ fontSize: "18px", color: '#4F638C', cursor: 'pointer', alignItems: 'center', }} onClick={() => toggle()} />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>Em breve</Typography>
            </Box>
        </Box>
    )
}