
import { IS_LOGIN, IS_PROFILEIMAGE } from "../type"

export const IsLogin = (value: boolean) => async (dispatch: any) => {
    dispatch({
        type: IS_LOGIN,
        payload: value
    })
}

export const IsProfileImage = (value: any) => async (dispatch: any) => {
    dispatch({
        type: IS_PROFILEIMAGE,
        payload: value
    })
}
