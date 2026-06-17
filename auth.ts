import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const DEV_SESSION = {
  user: { email: 'dev@pikko.app', name: 'Dev User', image: '' },
  expires: '2099-01-01T00:00:00.000Z',
} as const;

const { handlers, auth: _auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      if (user?.name)  token.name  = user.name;
      if (user?.image) token.picture = user.image;
      return token;
    },
    session({ session, token }) {
      if (token.email) session.user.email = token.email as string;
      if (token.name)  session.user.name  = token.name  as string;
      if (token.picture) session.user.image = token.picture as string;
      return session;
    },
  },
  pages: { signIn: '/parent/login' },
});

// Dev bypass — set BYPASS_AUTH=true in .env.local to skip auth on localhost
const auth = (process.env.BYPASS_AUTH === 'true'
  ? async () => DEV_SESSION
  : _auth) as typeof _auth;

export { handlers, auth, signIn, signOut };
