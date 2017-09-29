import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  static init(): Promise<any> {
    
    const keycloakAuth: any = Keycloak({
      "realm": "qipai",
      "url": "http://192.168.72.101:8080/auth",
      "clientId": "qipaipm"
    });
    
    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'login-required', checkLoginIframe: false})
      .success(() => {
        KeycloakService.auth.loggedIn = true;
        KeycloakService.auth.authz = keycloakAuth;
        KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl
          + '/realms/afiliamedica/protocol/openid-connect/logout?redirect_uri='
          + document.baseURI;
        resolve();
      })
      .error(() => {
        reject();
      });
    });
  }

  logout() {
    KeycloakService.auth.authz.logout();
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;
    
    //window.location.href = KeycloakService.auth.logoutUrl;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not loggen in');
      }
    });
  }
}
