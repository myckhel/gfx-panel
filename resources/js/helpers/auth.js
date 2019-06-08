import Http from '../util/Http'
import {_token} from '../Constants/defaultValues';
// import
export default class {
  constructor() {

  }

  static signInWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
      return
    }

    return Http.post('/api/auth/login', {email, password})
    // $.post('/api/auth/login', {email, password, _token})
  }

  static createUserWithEmailAndPassword = async (name, email, password, password_confirmation) => {
    if (!email || !password || !name || !password_confirmation) {
      return
    }
    console.log(email, password, password_confirmation, name, _token);

    return Http.post('/api/auth/signup', {name, email, password, password_confirmation})
    // $.post('/api/auth/signup', {name, email, password, password_confirmation, _token})
  }

  static logout = async (access_token) => {
    return Http.get('/api/auth/logout')
  }

  static checkAuth = async () => {
    return Http.get('/api/users/current')
  }
}
