import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/lib/mongodb";

// Define your admin emails
const adminEmails = ['chiemgiabaost@gmail.com', 'kuriseti.sravan@gmail.com','jeremyj3@my.yorku.ca','victor980911@yahoo.com'];

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,  // Use NEXTAUTH_SECRET instead of NEXT_PUBLIC_SECRET
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email || !adminEmails.includes(session.user.email)) {
    res.status(401).end();  // Not authorized
    throw new Error('Not an admin');
  }
}
