import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */

    interface User {
        username: string;
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
        roles: string[];
    }

    interface Session {
        user: Pick<User, "username" | "roles"> & DefaultSession["user"]
        accessToken: string;
    }


}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        expiresIn: number;
        accessToken: string;
        user: User;
    }
}