import { Action, createReducer, on } from "@ngrx/store";
import { AuthState, initialState } from "./auth.state";
import { loginSuccess } from "./auth.action";


const _authReducer = createReducer(initialState,
    on(loginSuccess, (state, action) => {
        return{
            ...state,
            user: action.user,
        }
    })
)

export function AuthReducer(state: AuthState | undefined, action: Action){
    return _authReducer(state, action);
}