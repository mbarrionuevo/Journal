import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';

import { useDispatch } from 'react-redux'
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';




export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIN, setIsLoggedIN] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                setChecking(false);
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIN(true);
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIN(false);
                setChecking(false);
            }

        })
    }, [dispatch, setChecking, setIsLoggedIN])

    if (checking) {
        return (
            <h1>Wait...</h1>
        )

    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={!isLoggedIN}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIN}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
