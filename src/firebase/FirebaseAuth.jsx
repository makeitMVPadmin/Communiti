import firebase from 'firebase/auth'
import { GoogleAuthProvider,
         getAuth, 
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword, 
        signInWithPopup } from 'firebase/auth'

export default function FirebaseAuth() {
    const auth = getAuth()
    const handleSignUp = () => {
        createUserWithEmailAndPassword( auth, email, password )
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
            })
    }

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                const user = result.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.customData.email
                const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }
}