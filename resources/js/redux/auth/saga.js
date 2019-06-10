import Http from '../../util/Http'

import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    CHECK_AUTH
} from '../../Constants/actionTypes';

import {auth} from '../../helpers'

import {
    loginUserSuccess,
    registerUserSuccess,
    storeUser
} from './actions';

const loginWithEmailPasswordAsync = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);



function* loginWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
        if (loginUser.status === 200) {
            Http.defaults.headers.common['Authorization'] = `Bearer ${loginUser.data.access_token}`;
            localStorage.setItem('access_token', loginUser.data.access_token);
            yield put(loginUserSuccess(loginUser.data.user));
            history.push('/');
        } else if (loginUser.status === 401) {
          console.log(loginUser.message);
        } else {
            // catch throw
            console.log('login failed :', loginUser.message)
        }
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}

const registerWithEmailPasswordAsync = async (email, password, name,  password_confirmation) =>
    await auth.createUserWithEmailAndPassword(email, password, name,  password_confirmation)
        .then(authUser => authUser)
        .catch(error => error);

const checkAuthAsync = async () =>
  await auth.checkAuth()
  .then(authUser => authUser)
  .catch(error => error);


function* checkAuth () {
  const access_token = localStorage.getItem('access_token');
  if (access_token){
    Http.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    try {
        const authUser = yield call(checkAuthAsync);
        if (authUser.data.status) {
            yield put(storeUser(authUser.data.user));
        } else {
            // catch throw
            console.log('Auth failed :', authUser.data.text)
        }
    } catch (error) {
        // catch throw
        console.log('Auth error : ', error)
    }
  }
}

function* registerWithEmailPassword({ payload }) {
    const { name, email, password, password_confirmation } = payload.user;
    const { history } = payload
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, name, email, password,  password_confirmation);
        if (registerUser.message === "Successfully created user!") {
            HTTP.defaults.headers.common['Authorization'] = `Bearer ${loginUser.data.access_token}`;
            localStorage.setItem('access_token', registerUser.data.user.access_token);
            yield put(registerUserSuccess(registerUser.data.user));
            history.push('/')
        } else {
            // catch throw
            console.log('register failed :', registerUser.message)
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}


const logoutAsync = async (history) => {
    await auth.logout().then(authUser => authUser).catch(error => error);
    // window.location.push('/')
    // window.location.reload()
    // history.push('/')
}

function* logout({payload}) {
  console.log(payload);
    const { history } = payload
    try {
        yield call(logoutAsync,history);
        localStorage.removeItem('access_token');
    } catch (error) {
      console.log(error);
    }
}



export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchCheckAuth() {
    yield takeEvery(CHECK_AUTH, checkAuth);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchCheckAuth),
    ]);
}
