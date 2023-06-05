import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import useAuth from '../Hooks/useAuth';

const PrivetRoute = ({ children, ...rest }) => {
    const {  isLoading } = useAuth();
    let token = localStorage.getItem('token');
    //this is used for solve reload to redirect login issue
    if (isLoading) {
        return (<LoadingScreen></LoadingScreen>);
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
            token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivetRoute;

/* if (!isLoading) {
    return (<LoadingScreen></LoadingScreen>);
} */