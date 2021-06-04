import { 
    takeLatest, 
    call, 
    put, 
    all,
    select
  } from 'redux-saga/effects'
import {
      action_type as TYPE
  } from './action'  
import * as api from '../../apis/Customers'
  
function* getListSaga(action) {
      try {
          const { params } = action
          const response = yield call(api.getList, params)
          if(response.status){
                  yield all([
                      put({type: TYPE.CUSTOMER.SUCCESS, ...response}),
                  ])
          }else{
            yield put({type: TYPE.CUSTOMER.ERROR, error: response})
          }
      } catch (error) {
          yield all([
              put({type: TYPE.CUSTOMER.ERROR, error})
          ])
      }
  }
  
  function* CreateSaga(action) {
    try {
        const { params } = action
        let data = params
        console.log(data);
        const response = yield call(api.create, data)
        if(response.status){
                yield all([
                    put({type: TYPE.CREATE.SUCCESS, ...response}),
                ])
        }else{
          yield put({type: TYPE.CREATE.ERROR, error: response})
        }
    } catch (error) {
        yield all([
            put({type: TYPE.CREATE.ERROR, error})
        ])
    }
}

  function* watcher() {
      yield all([
          takeLatest(TYPE.CUSTOMER.REQUEST, getListSaga),
          takeLatest(TYPE.CREATE.REQUEST, CreateSaga)
      ])
  }
  
  export default watcher