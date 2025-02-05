import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userRecoverReducer
} from './reducers/userReducers';

import {
  classDetailsReducer,
  classCreateReducer,
  classShowReducer,
  classSignatureReducer,
  classQrReducer,
  cancelClassStatusReducer
} from './reducers/classReducers';

import { qrCreateReducer } from './reducers/qrReducers';

import { attendanceCreateReducer } from './reducers/attendanceReducers';

import { assigmentDetailsReducer } from './reducers/assigmentReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userRecover: userRecoverReducer,

  classDetails: classDetailsReducer,
  classCreate: classCreateReducer,
  classShow: classShowReducer,
  classSignature: classSignatureReducer,
  classQr: classQrReducer,
  classCancel: cancelClassStatusReducer,

  qrGenerate: qrCreateReducer,

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
