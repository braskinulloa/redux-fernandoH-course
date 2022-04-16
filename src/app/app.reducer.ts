import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer'
import * as ie from './ingreso-egreso/ingreso-egreso.reducer'


export interface AppState {
   ui: ui.State,
   usuario: auth.State,
   // ie: ie.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   usuario: auth.authReducer,
   // ie: ie.ingresoEgresoReducer
}