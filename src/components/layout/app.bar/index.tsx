import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function AppBarComponent() {
    return (
        <Box>
            <AppBar position="static" sx={{backgroundColor: '#d32f2f'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <ConstructionIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        INVENTÁRIO CASA CLÁUDIO
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}