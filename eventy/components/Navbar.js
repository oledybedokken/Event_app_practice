import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
export default function Navbar() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const SignOut = ()=>{
    signOut(auth)
    router.reload();
  }
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Eventy</button>
          </Link>
        </li>
        {/* user is signed-in and has username */}
        {user && (
          <>
            <li className="push-left">
              <button onClick={SignOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}
        {/* user is not signed OR has not created username */}
        {!user && (
          <li>
            <Link href="/profil">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}