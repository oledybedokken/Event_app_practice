import { signInWithPopup, GoogleAuthProvider, signOut } from "@firebase/auth";
import { useContext } from "react";
import { auth } from "../lib/firebase";
import { UserContext } from "../lib/context";
export default function EnterPage({ }) {
    const { user, username } = useContext(UserContext)
    return (
        <main>
            <h1>Enter</h1>
            {}
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}
function SignInButton() {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, new GoogleAuthProvider())
    }
    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src="/google.png"></img>Sign in with google
        </button>
    )
}
function SignOutButton() {
    const SignOut = async()=>{

        await signOut(auth)
    }
    const SignOutTest = async () => {
        console.log("btn clicked")
    }
    return (
        <button onClick={()=>SignOutTest}>
            Sign Out
        </button>)
}
function UsernameForm() {
    return null;
  }
