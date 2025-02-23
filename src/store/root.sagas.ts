
import { all, fork } from 'redux-saga/effects'

import produtosSaga from './produtos/sagas'

const rootSaga = function* () {
    yield all([
        fork(produtosSaga), 
    ])
}

export default rootSaga

