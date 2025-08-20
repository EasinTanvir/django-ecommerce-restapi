import CredentialsProvider from "next-auth/providers/credentials";

import api from "@/api/api";

export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials, req) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        const sendData = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const { data } = await api.post("/user/login", sendData);
          console.log("data", data);
          const payload = {
            username: data.user.username,
            role: data.user.role,
            id: data.user.id,
          };
          console.log("payload", payload);
          return payload;
        } catch (err) {
          console.log("err", err.response.data?.message);
          throw new Error(err.response.data?.message || "Invalid Credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        (token.id = user?.id), (token.name = user?.username);

        token.role = user?.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token?.id;
      session.user.name = token?.name;
      session.user.role = token?.role;

      return session;
    },
  },

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};
