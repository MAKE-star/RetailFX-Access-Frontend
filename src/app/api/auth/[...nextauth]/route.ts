import authService from "@/services/auth/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials) {
        try {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };

          const user = await authService.signin({
            username,
            password,
          });
          if (user) {
            return user.data;
          } else {
            console.log("error")
            
          }

        } catch (error: any) {
          console.log(error,"error")
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };