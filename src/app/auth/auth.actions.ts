import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
    '[Auth] setUser',
    props<{ usuario: Usuario }>()
    );
export const unSetUser = createAction('[Auth] unSetUser');