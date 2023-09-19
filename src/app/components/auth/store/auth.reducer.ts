import { createReducer, on } from "@ngrx/store";

import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User | null;
  loading: boolean;
  authError: string;
}

const initialState: State = {
  user: null,
  loading: false,
  authError: "",
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticateSuccess, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );
    return {
      ...state,
      user: user,
      loading: false,
      authError: "",
    };
  }),
  on(AuthActions.autenticateFail, (state, action) => {
    return {
      ...state,
      user: null,
      loading: false,
      authError: action.message,
    };
  }),
  on(AuthActions.loginStart, (state) => {
    return {
      ...state,
      loading: true,
      authError: "",
    };
  }),
  on(AuthActions.signupStart, (state) => {
    return {
      ...state,
      loading: true,
      authError: "",
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(AuthActions.clearError, (state) => {
    return {
      ...state,
      authError: "",
    };
  })
);
