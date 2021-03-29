import { types } from '../types/types'
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { uiFinishLoading, uiStartLoading } from './ui'
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(uiStartLoading());
        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(uiFinishLoading());
        }).catch(error => {
            console.error(error)
            dispatch(uiFinishLoading());
            Swal.fire('Error', error.message, 'error')
        })

    }
}

export const startRegistrerWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(async ({ user }) => {
            await user.updateProfile({
                displayName: name
            });
            dispatch(login(user.uid, user.displayName))
        }).catch(err => Swal.fire('Error', err.message, 'error'))
    }
}


export const startGoogleLogin = () => {
    return async (dispatch) => {
        const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
        dispatch(login(user.uid, user.displayName))
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
}
)

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(noteLogout());
        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})