import jwtDecode from 'jwt-decode';

class AuthService {
  static getProfile() {
    //decode the token from local storage
    const token = this.getToken();
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  static loggedIn() {
    //return token if user is currently logged in
    const token = this.getToken();
    return token;
  }

  static isTokenExpired(token: string) {
    //check if current time is passed the token expiration
    const decodedToken: any = this.getProfile();
    if (!token || !decodedToken.exp) {
      return true;
    } else {
      const currentTime = Date.now() / 1000;
      return currentTime > decodedToken.exp;
    }
  }

  static getToken(): string {
    //get the token from local storage
    const storageToken = localStorage.getItem('id_token') || '';
    return storageToken;
  }

  static login(idToken: string) {
    //put the token in local storage after user is logged in and go to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home');
  }

  static logOut() {
    //remove token and redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/loginpage');
  }
}

export default AuthService;
