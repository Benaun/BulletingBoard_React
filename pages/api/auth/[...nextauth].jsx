import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import users from '@/assets/users';


const authConfig = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Credentials({
            name: "",
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true },
            },
            async authorize(credentials) {
                
                if (!credentials?.email || !credentials.password) return null;

                const currentUser = users.find(user => user.email === credentials.email);

                if (currentUser && currentUser.password === credentials.password) {
                    const { password, ...userWithoutPassword} = currentUser;

                    return userWithoutPassword
                }
            }
        })
    ],
};


export default NextAuth(authConfig)
