import {_token} from '../Constants/defaultValues';
// import
export default class {
  constructor() {

  }

  static signInWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
      return
    }

    return $.post('/api/auth/login', {email, password, _token})
    // .done((res) => {
    //   if (true) {
    //
    //   } else {
    //
    //   }
    //   console.log(res);
    // })
    // .fail((err) => {
    //   console.log(err);
    // })
  }

  static createUserWithEmailAndPassword = async (name, email, password, password_confirmation) => {
    if (!email || !password || !name || !password_confirmation) {
      return
    }
    console.log(email, password, password_confirmation, name, _token);

    return $.post('/api/auth/signup', {name, email, password, password_confirmation, _token})
  }
}
