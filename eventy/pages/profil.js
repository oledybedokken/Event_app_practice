import { signInWithPopup, GoogleAuthProvider, signOut } from "@firebase/auth";
import { useCallback, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";
import { doc, getDoc, getDocFromCache, writeBatch } from "firebase/firestore";
export default function profile({ }) {
    const { user, username } = useContext(UserContext)
    return (
        <main>

            {user ? <h1>Du er Logget inn </h1> : <h3>Du er ikke logget inn </h3>}
            <br></br>
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
    const SignOut = async () => {
        await signOut(auth)
    }
    const SignOutTest = async () => {
        console.log("btn clicked")
    }
    return (
        <button onClick={() => SignOutTest}>
            Sign Out
        </button>)
}
function UsernameForm() {
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }
        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const userDoc = doc(db, `users/${user.uid}`);
        const usernameDoc = doc(db, `usernames/${formValue}`);
        //
        const batch = writeBatch(db);
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
        batch.set(usernameDoc, { uid: user.uid });
        await batch.commit();
    }

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    const checkUsername = useCallback(debounce(async (username) => {
        if (username.length >= 3) {
            const docRef = doc(db, `usernames/${username}`);
            const docSnap = await getDoc(docRef);
            console.log(!docSnap.exists())
            console.log("Firestore read executed!");
            setIsValid(!docSnap.exists())
            setLoading(false)
        }
    }, 500), []);
    return (
        !username &&
        <section>
            <h3>Choose Username</h3>
            <form onSubmit={onSubmit}>
                <input name="username" placeholder="username" value={formValue} onChange={onChange} />
                <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                <button type="submit" className="btn-green" disabled={!isValid}>
                    Choose name
                </button>
                <h3>Debug State</h3>
                <div>
                    Username: {formValue}
                    <br />
                    Loading: {loading.toString()}
                    <br />
                    Username Valid: {isValid.toString()}
                </div>
            </form>
        </section>
    )
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    }
    else if (isValid) {
        return <p className="text-success">{username} is available!</p>
    }
    else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>
    }
    else {
        return <p></p>
    }
}