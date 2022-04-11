import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from "../models/ingreso-egres.model";


export const unSetItems = createAction('[IE] unset Items')
export const setItems = createAction('[IE] set Items', props<{ items: IngresoEgreso[] }>());
