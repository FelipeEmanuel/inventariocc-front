import { createBrowserRouter } from 'react-router-dom'
import Produtos from '../containers/produtos'

const router: any = createBrowserRouter([
    {
        path: '/',
        element: <Produtos/>
    },
])

export default router