import NextAuth, {NextAuthOptions} from "next-auth"
import {api} from "../../../utils/axiosInterceptors";
import {JWT} from "next-auth/jwt";
import {NextApiRequest, NextApiResponse} from "next";
import CredentialsProvider from "next-auth/providers/credentials";


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    async function refreshAccessToken(token: JWT) {
        try {
            const response = await api.post('/users/refreshToken', {
                    refreshToken: token.refreshToken
                }
            )
            const {accessToken, refreshToken, expiresIn} = response.data;
            return {
                ...token,
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: expiresIn,
            }
        } catch (error) {
            console.log(error)
            return {
                ...token,
                error: "RefreshAccessTokenError",
            }
        }
    }
    return await NextAuth(req, res, {
        pages: {
            signIn: '/login'
        }
        ,
        secret: process.env.SECRET,
        providers: [
            CredentialsProvider({
                credentials: {
                    username: {label: 'Username', type: 'text'},
                    password: {label: 'Password', type: 'password'},
                },
                async authorize(credentials, req) {
                    try {
                        const response = await api.post("/users/login", credentials)
                        const user = response.data;
                        if (user) {
                            return user
                        }
                        return null
                    } catch (err: any) {
                        console.log(err.response.data);
                    }

                }
            })
        ],
        callbacks: {
            async jwt({token, user}) {
                if (user) {
                    return {
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken,
                        expiresIn: user.expiresIn,
                        user
                    }
                }
                if (Date.now() < token.expiresIn) {
                    try {
                        const response = await api.get('/users/getUser', {
                            headers: {
                                "Authorization": `bearer ${token.accessToken}`
                            }
                        });
                        token.user = response.data;
                    } catch (e) {
                        throw e;
                    }

                    return token;
                }

                return refreshAccessToken(token)
            }
            ,
            async session({session, token}) {
                session.user.username = token.user.username;
                session.user.roles = token.user.roles;
                session.accessToken = token.accessToken;
                session.error = token.error;
                return session
            }
        }
    })
}