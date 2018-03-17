import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Angular2TokenService } from "angular2-token";
import { Observable } from "rxjs/observable";

import { User } from "./user.model";

@Injectable()

export class AuthService {
  public constructor (private tokenService: Angular2TokenService) { }

  public signUp(user: User) {
    // can a2token and return Observable<Response>
  }

  public signIn(uid: string, password: string) {
    // can a2token and return Observable<Response>
  }

  public signOut() {
    // can a2token and return Observable<Response>
  }

  public userSignedIn() {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(error: Response) {
    console.log('Erro para LOG => ', error);
    return Observable.throw(error);
  }
}