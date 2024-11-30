import {useDispatch} from "react-redux";
import {AppDispatch} from "@/appStore/store.ts";
import {logout} from "@/appStore/loginSlice.ts";
import * as React from "react";
import {ErrorComponent} from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";


function NoAuthError({error}) {
    console.log('rendering 401 error component')
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    useEffect(() => {
        if (error.message === "401 ERROR") {
          dispatch(logout()); // This is a side effect
        }
        navigate({to:"/"})
      }, [error, dispatch,navigate]);



    return <ErrorComponent error={error}/>
}

export default NoAuthError;