import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import api from "../../../utils/axiosInterceptors";

export default NextAuth({
    pages: {
        signIn: '/login'
    },
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                username: {label: 'Username',type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
               try {
                   const res = await api.post("/users/login", credentials)
                   const user = res.data;
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
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.user = user;
                return token;
            }

            return token
        },
        async session({session, token}) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session
        }
    }
})