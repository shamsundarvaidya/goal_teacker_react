import {useDispatch} from "react-redux";
import {AppDispatch} from "@/appStore/store.ts";
import {logout} from "@/appStore/loginSlice.ts";
import * as React from "react";
import {ErrorComponent} from "@tanstack/react-router";


function NoAuthError({error}) {
    console.log('rendering 401 error component')
    const dispatch = useDispatch<AppDispatch>();
    if (error.message == "401 ERROR") {
        dispatch(logout());

        return (
            <div>
                {error.message}
            </div>);

    }

    return <ErrorComponent error={error}/>
}

export default NoAuthError;