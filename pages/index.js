import {useSession,signIn, signOut} from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();

  if (!session) {
    return (
      <div className="bg-gradient-to-r from-black to-blue-900 w-screen h-screen flex justify-center items-center">
        <div className="text-blue-900 flex justify-between">
          <a href="/api/auth/signin" className="text-white hover:underline">Sign in</a>
        </div>
      </div>
    )
  }
  return (
    <div>
      Logged in as {session.user.email} <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
