import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import '../../keycloak.js'
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
        // const keycloakAuth: any = Keycloak({
        //     "realm": "qipai",
        //     "url": "http://localhost:8080/auth",
        //     "clientId": "qipaipm",
        //     "cors": true,
        //     "ssl-required" : "external",
        //     "clientSecret": "affdd342-69ca-4887-acce-0f9114b26195",
        //     //"sessionId":"1619f21c-0292-4b9d-9e1c-dcd0fdd1a2a8",
        //     "publicClient":true,
        //     "use-resource-role-mappings": true,
        //     "bearer-only": false,
        //     "redirect_uri": "http://localhost:8100/*",
        //     "resource": "tutorial-frontend",
        // });


        const keycloakAuth: any = new Keycloak({
            "realm": "qipai",
            "auth-server-url": "http://192.168.72.101:8080/auth",
            "url": "http://192.168.72.101:8080/auth",
            "ssl-required": "none",
            "resource": "qipai-web",
            "clientId": "qipai-web",
            //"use-resource-role-mappings":true,
            "credentials": {
                "secret": "90e55a65-217c-4b87-b698-c95c4e7e0644"
            },
            //"policy-enforcer": {}
        });

        Keycloak2Provider.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
            //adapter : 'cordova', checkLoginIframeInterval:1, checkLoginIframe: true
            keycloakAuth.init({ onLoad: 'login-required'})
                .success(() => {
                console.log(keycloakAuth);
                Keycloak2Provider.auth.loggedIn = true;
                Keycloak2Provider.auth.authz = keycloakAuth;
                Keycloak2Provider.auth.logoutUrl = keycloakAuth.authServerUrl
                    + + "/realms/" + "qipai" + "/protocol/openid-connect/logout?redirect_uri="
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
    }

    login(): void {
        Keycloak2Provider.auth.authz.login();
    }
    /**
     * Clears Authentication State
     */
    clearToken(): void {
        Keycloak2Provider.auth.authz.clearToken();
    }
    /**
     * Return the users realm level roles
     */
    getRealmRoles(): void {
        return Keycloak2Provider.auth.authz.realmAccess.roles;
    }

    hasRealmRole(role: String): boolean {
        return Keycloak2Provider.auth.authz.hasRealmRole(role);
    }
    /**
     * Get Server/Open ID Connect specific server info
     */
    getConfiguration(): object {
        var notAvailable = "N/A";
        return {
            "authServerUrl": Keycloak2Provider.auth.authz.authServerUrl ? Keycloak2Provider.auth.authz.authServerUrl : notAvailable,
            "openIdFlow": Keycloak2Provider.auth.authz.flow ? Keycloak2Provider.auth.authz.flow : notAvailable,
            "openIdResponseMode": Keycloak2Provider.auth.authz.responseMode ? Keycloak2Provider.auth.authz.responseMode : notAvailable,
            "openIdResponseType": Keycloak2Provider.auth.authz.responseType ? Keycloak2Provider.auth.authz.responseType : notAvailable,
            "realm": Keycloak2Provider.auth.authz.realm ? Keycloak2Provider.auth.authz.realm : notAvailable,
            "clientId": Keycloak2Provider.auth.authz.clientId ? Keycloak2Provider.auth.authz.clientId : notAvailable,
            "timeSkew": Keycloak2Provider.auth.authz.timeSkew ? Keycloak2Provider.auth.authz.timeSkew : notAvailable
        };
    }
    /**
     * Redirects to the Account Management Console
     */
    accountManagement(): void {
        Keycloak2Provider.auth.authz.accountManagement();
    }
    /**
     * Get the users profile
     */
    loadUserProfile(): any {
        // Retrieve User Profile
        return new Promise((resolve, reject) => {
            Keycloak2Provider.auth.authz.loadUserProfile().success((profile) => {
                resolve(<object>profile);
            }).error(() => {
                reject('Failed to retrieve user profile');
            });
        });
    }

    viewGuard(role: string): boolean {
        if(Keycloak2Provider.auth.authz.hasRealmRole(role)) {
            return true
        } else {
            //this.alertCtrl.create({title: 'Access Denied', subTitle: "You don't have access to the requested resource."}).present();
            return false;
        }
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
