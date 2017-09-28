import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
declare var require: any;
var keycloakConfig = require('../../config/keycloak.json');
declare var Keycloak: any;
/*
  Generated class for the KeycloakServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class KeycloakServiceProvider {
    static auth: any = {};

  constructor(public http: Http) {
    console.log('Hello KeycloakServiceProvider Provider');
  }

    /**
     * Initialise the Keycloak Client Adapter
     */
    static init(): Promise<any> {
        // Create a new Keycloak Client Instance
        let keycloakAuth: any = new Keycloak(keycloakConfig);

        return new Promise((resolve, reject) => {
            keycloakAuth.init({ onLoad: 'login-required', flow: 'implicit' }).success(() => {
                KeycloakServiceProvider.auth.authz = keycloakAuth;
                KeycloakServiceProvider.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/keypress/protocol/openid-connect/logout?redirect_uri=/";
                resolve();
            }).error((err) => {
                reject(err);
            });
        });
    }
    /**
     * Redirect to logout
     */
    logout(): void {
        KeycloakServiceProvider.auth.authz.logout();
    }
    /**
     * Redirect to Login
     */
    login(): void {
        KeycloakServiceProvider.auth.authz.login();
    }
    /**
     * Clears Authentication State
     */
    clearToken(): void {
        KeycloakServiceProvider.auth.authz.clearToken();
    }
    /**
     * Return the users realm level roles
     */
    getRealmRoles(): void {
        return KeycloakServiceProvider.auth.authz.realmAccess.roles;
    }
    /**
     * Check if the user has a specified realm role
     */
    hasRealmRole(role: String): boolean {
        return KeycloakServiceProvider.auth.authz.hasRealmRole(role);
    }
    /**
     * Get Server/Open ID Connect specific server info
     */
    getConfiguration(): object {
        var notAvailable = "N/A";
        return {
            "authServerUrl": KeycloakServiceProvider.auth.authz.authServerUrl ? KeycloakServiceProvider.auth.authz.authServerUrl : notAvailable,
            "openIdFlow": KeycloakServiceProvider.auth.authz.flow ? KeycloakServiceProvider.auth.authz.flow : notAvailable,
            "openIdResponseMode": KeycloakServiceProvider.auth.authz.responseMode ? KeycloakServiceProvider.auth.authz.responseMode : notAvailable,
            "openIdResponseType": KeycloakServiceProvider.auth.authz.responseType ? KeycloakServiceProvider.auth.authz.responseType : notAvailable,
            "realm": KeycloakServiceProvider.auth.authz.realm ? KeycloakServiceProvider.auth.authz.realm : notAvailable,
            "clientId": KeycloakServiceProvider.auth.authz.clientId ? KeycloakServiceProvider.auth.authz.clientId : notAvailable,
            "timeSkew": KeycloakServiceProvider.auth.authz.timeSkew ? KeycloakServiceProvider.auth.authz.timeSkew : notAvailable
        };
    }
    /**
     * Redirects to the Account Management Console
     */
    accountManagement(): void {
        KeycloakServiceProvider.auth.authz.accountManagement();
    }
    /**
     * Get the users profile
     */
    loadUserProfile(): any {
        // Retrieve User Profile
        return new Promise((resolve, reject) => {
            KeycloakServiceProvider.auth.authz.loadUserProfile().success((profile) => {
                resolve(<object>profile);
            }).error(() => {
                reject('Failed to retrieve user profile');
            });
        });
    }
    /**
     * Check if the user has a given role
     * @param role The role to check if the user posesses
     */
    viewGuard(role: string): boolean {
        if(KeycloakServiceProvider.auth.authz.hasRealmRole(role)) {
            return true
        } else {
            //this.alertCtrl.create({title: 'Access Denied', subTitle: "You don't have access to the requested resource."}).present();
            return false;
        }
    }
}
