import {useEffect, useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

const useAuth = async ()  => {
    const {data: session, status} = useSession();

    if (session?.error) {
        return signOut();
    }




}

export default useAuth;