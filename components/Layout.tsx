import Navbar from './Navbar'
import React, {ReactNode, useEffect} from "react";
import Footer from "./Footer";
import {signOut, useSession} from "next-auth/react";
import {setBearer} from "../utils/axiosInterceptors";
import Loader from "./helpers/Loader";

interface Props {
    children: ReactNode
}

export default function Layout({children}: Props) {
    const {data: session, status} = useSession();
    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signOut()
        }
    }, [session])

    if (status === 'authenticated') {
        setBearer(session?.accessToken)
    }

    if (status === 'loading') {
        return (
            <div className={'bg-gray-800 my-auto h-screen mb-12 flex items-center justify-center'}>
                <Loader className={'w-10 h-10'}></Loader>
            </div>
        )
    }

    return (
        <>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}