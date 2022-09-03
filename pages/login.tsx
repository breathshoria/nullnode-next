import React, {useState} from 'react';
import {signIn} from "next-auth/react";
import Link from "next/link";
import Loader from "../components/helpers/Loader";
import PageHead from "../components/PageHead";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [isLoading, setLoading] = useState(false);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (event: any) => {
        await event.preventDefault();
        setLoading(true);
        await signIn('credentials', {
            username: credentials.username,
            password: credentials.password,
            callbackUrl: '/'
        })
        setLoading(false);

    }

    return (
        <div className={'min-h-screen mt-5 flex flex-col items-center'}>
            <PageHead title={'Login'} />
            <form className={'w-2/3 sm:w-1/3'}>
                <label>
                    <span className={'text-lg sm:text-base'}>Username</span>
                    <input
                        className={'mt-3 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1'}
                        type="text"
                        name={'username'}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
                <label>
                    <span className={'text-lg sm:text-base'}>Password</span>
                    <input
                        className={'mt-2 h-10 pl-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}
                        name={'password'}
                        type="password"
                        onChange={(e) => handleChange(e)}
                    />
                </label>
                <div className={'mt-5 flex flex-row justify-between items-start gap-3'}>
                    <button
                        className="bg-gray-700 hover:bg-sky-700 text-white p-5 h-10 rounded-md font-medium flex items-center"
                        onClick={handleSubmit}
                        onChange={(e) => handleChange(e)}
                    >
                        {isLoading && <Loader className={'w-5 h-5'}></Loader>}
                        <span className={'text-lg sm:text-base'}>Login</span>
                    </button>

                    <Link href={'/register'}>
                        <button
                            className={'text-white text-xs cursor-pointer p-2 bg-gray-700 hover:bg-sky-700 rounded-md'}>
                            <span>Forgot password?</span>
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login