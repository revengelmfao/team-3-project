import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    //decode the token from local storage
    const token = this.getToken();
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  loggedIn() {
    //return token if user is currently logged in
    const token = this.getToken();
    return token;
  }

  isTokenExpired(token: string) {
    //check if current time is passed the token expiration
    const decodedToken: JwtPayload = this.getProfile();
    if (!token || !decodedToken.exp) {
      return true;
    } else {
      const currentTime = Date.now() / 1000;
      return currentTime > decodedToken.exp;
    }
  }

  getToken(): string {
    //get the token from local storage
    const storageToken = localStorage.getItem('id_token') || '';
    return storageToken;
  }

  login(idToken: string) {
    //put the token in local storage after user is logged in and go to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home');
  }

  logOut() {
    //remove token and redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/loginpage');
  }
}

export default AuthService;
