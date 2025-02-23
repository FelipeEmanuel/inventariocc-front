import React, { Component, Suspense } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import ErrorBoundary from './components/layout/error.boundary'
import Loading from './components/layout/loading'


class ThemeProviderComponent extends Component<any> {

    public render() {

        return <ThemeProvider theme={createTheme()}>
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
