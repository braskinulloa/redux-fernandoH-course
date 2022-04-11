import { ActionReducerMap } from '@ngrx/store';
import { Usuario } from './models/usuario.model';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer'


export interface AppState {
   ui: ui.State,
   usuario: auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   usuario: auth.authReducer
}