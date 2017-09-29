import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
declare var Keycloak: any;
/*
  Generated class for the Keycloak2Provider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Keycloak2Provider {
    static auth: any = {};
  constructor(public http: Http) {

  }

    static init(): Promise<any> {
        const keycloakAuth: any = Keycloak({
            "realm": "qipai",
            "url": "http://52.80.11.196:9090/auth",
            "clientId": "qipaipm",
            "enable-cors": true,
            "ssl-required" : "external",
            "sessionId":"1619f21c-0292-4b9d-9e1c-dcd0fdd1a2a8",
            "publicClient":true,
            "use-resource-role-mappings": true,
            "bearer-only": false,
        });

        Keycloak2Provider.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
            keycloakAuth.init({ onLoad: 'login-required', checkLoginIframeInterval:1, checkLoginIframe: true})
                .success(() => {
              console.log(keycloakAuth);
                    if (keycloakAuth.authenticated) {
                        console.log(keycloakAuth.tokenParsed);
                    } else {
                        console.log("未认证");
                    }
                    Keycloak2Provider.auth.loggedIn = true;
                    Keycloak2Provider.auth.authz = keycloakAuth;
                    Keycloak2Provider.auth.logoutUrl = keycloakAuth.authServerUrl
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
        Keycloak2Provider.auth.authz.logout();
        Keycloak2Provider.auth.loggedIn = false;
        Keycloak2Provider.auth.authz = null;

        //window.location.href = KeycloakService.auth.logoutUrl;
    }

    getToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (Keycloak2Provider.auth.authz.token) {
                Keycloak2Provider.auth.authz
                    .updateToken(5)
                    .success(() => {
                        resolve(<string>Keycloak2Provider.auth.authz.token);
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
