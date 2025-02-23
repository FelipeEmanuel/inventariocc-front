
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import produtos from './produtos'

import rootSaga from './root.sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        produtos
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, seriazableCheck: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store

