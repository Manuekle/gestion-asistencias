import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userRecoverReducer
} from './reducers/userReducers';

import {
  docenteLoginReducer,
  docenteRegisterReducer,
  docenteDetailsReducer
} from './reducers/docenteReducers';

import {
  estudianteLoginReducer,
  estudianteRegisterReducer,
  estudianteDetailsReducer
} from './reducers/estudianteReducers';

import {
  classDetailsReducer,
  classCreateReducer,
  classShowReducer,
  classSignatureReducer,
  classQrReducer,
  cancelClassStatusReducer,
  classDayReducer,
  classAllReducer
} from './reducers/classReducers';

import { qrCreateReducer } from './reducers/qrReducers';

import { createReportReducer } from './reducers/reportReducers';

import { attendanceCreateReducer } from './reducers/attendanceReducers';

import { assigmentDetailsReducer } from './reducers/assigmentReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userRecover: userRecoverReducer,

  docenteLogin: docenteLoginReducer,
  docenteRegister: docenteRegisterReducer,
  docenteDetails: docenteDetailsReducer,

  estudianteLogin: estudianteLoginReducer,
  estudianteRegister: estudianteRegisterReducer,
  estudianteDetails: estudianteDetailsReducer,

  classDetails: classDetailsReducer,
  classCreate: classCreateReducer,
  classShow: classShowReducer,
  classSignature: classSignatureReducer,
  classQr: classQrReducer,
  classCancel: cancelClassStatusReducer,
  classDay: classDayReducer,
  classAll: classAllReducer,

  qrGenerate: qrCreateReducer,

  reportCreate: createReportReducer,

  attendanceCreate: attendanceCreateReducer,

  assigmentDetails: assigmentDetailsReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
