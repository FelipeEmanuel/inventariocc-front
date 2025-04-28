import React, { Component, Suspense } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import ErrorBoundary from './components/layout/error.boundary'
import Loading from './components/layout/loading'
import { LanguageOptions, MAP_ENUM_TO_LOCALE } from './i18n'


class ThemeProviderComponent extends Component<any> {

    public render() {

        return <ThemeProvider theme={createTheme(MAP_ENUM_TO_LOCALE[LanguageOptions.PT_BR])}>
            <ErrorBoundary>
                <React.Fragment>
                    <CssBaseline/>
                    <Suspense fallback={<Loading/>}>
                        <RouterProvider router={router}/>
                    </Suspense>
                </React.Fragment>
            </ErrorBoundary>
        </ThemeProvider>
    }

}

const Theme: any = (ThemeProviderComponent)

export default Theme
