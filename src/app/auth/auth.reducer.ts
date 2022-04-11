import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Usuario } from '../models/usuario.model';
import * as auth from './auth.actions';

export interface State {
    usuario: Usuario | null; 
}

export const initialState: State = {
   usuario: null,
}

const _authReducer = createReducer(initialState,

    on(auth.setUser, (state, { usuario }) => ({ ...state, usuario: usuario })),
    on(auth.unSetUser, state => ({ ...state, usuario: null }))

);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}