import { signInWithPopup,GoogleAuthProvider,signOut } from "@firebase/auth";
import { async } from "@firebase/util";
import Head from "next/head";
import { auth } from "../lib/firebase";

export default function EnterPage({}) {
    return(
        <main>
            <h1>Enter</h1>
            <SignInButton/>
        </main>
    )
}
function SignInButton(){
    const signInWithGoogle = async () =>{
        await signInWithPopup(auth,new GoogleAuthProvider())
    }
    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src="/google.png"></img>Sign in with google
        </button>
    )
}
function SignOutButton(){
    return (
    <button onClick={()=>SignOut(auth)}>
        Sign Out
    </button>)  
}
 
