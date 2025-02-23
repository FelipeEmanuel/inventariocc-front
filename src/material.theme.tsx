declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
    }

    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tertiary: true;
    }
}

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark'
}

export const parseStringToThemeMode = (theme: string): ThemeMode => {
    switch (theme) {
        case 'light':
            return ThemeMode.LIGHT
        case 'dark':
            return ThemeMode.DARK
    }
    return ThemeMode.LIGHT
}

const DEFAULT_THEME: any = {
    spacing: 10,
    palette: {
        primary: { main: '#4f638cff' },
        secondary: { main: '#a63541ff' },
        tertiary: {
            main: '#d9dcf7ff',
            contrastText: '#000000de',
        }
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: window.screen.width <= 1366 ? 12 : 14
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '16px'
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-selectedRowCount': {
                        display: 'none'
                    },
                    '& .MuiTablePagination-root': {
                        width: '100%'
                    },
                    '& .MuiTablePagination-selectLabel': {
                        position:'absolute',
                        left: 0
                    },
                    '& .MuiInputBase-root': {
                        position:'absolute',
                        left: '100px'
                    }
                }
            }
        }
    }
}

const DARK_THEME: any = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,
        mode: 'dark'
    }
}

const LIGHT_THEME: any = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,
        background: {
            default: '#ecedf4ff',
            paper: '#ecedf4ff'
        },
        mode: 'light'
    }
}

const CONFIG_THEME = {
    light: LIGHT_THEME,
    dark: DARK_THEME
}

export default CONFIG_THEME
