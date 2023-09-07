import {  Route, Redirect } from 'react-router-dom';
// import {useContext} from "react";
// import {AuthContext} from "../context/AuthContext";

export function PrivateRoute( {component:Component, privateRoles, ...rest} ) {

    // const {roles} = useContext(AuthContext);

    const isAuthorized = (authRoles) => {

        /*if (authRoles) {
            console.log("IsAuthorized IF", roles);
            return roles.find((role) => roles.include(role));
        }
        console.log("IsAuthorized");
        return false;*/


        let rolesList = JSON.parse(localStorage.getItem("ROLE_LIST"));
        console.log("roles List ", rolesList);
        console.log("private role List ", authRoles);

        if (rolesList) {
            console.log("IsAuthorized IF", rolesList);
            // return rolesList.find((role) => authRoles.some((auth) => auth.include(role)));
            return rolesList.some(auth => auth.includes(authRoles));
        }
        console.log("IsAuthorized");
        return false;

    }

    return (
        <Route
            {...rest}
            render={props => {
                return isAuthorized(privateRoles)
                    ? <Component {...props} />
                    : <Redirect to="/login"/>
            }}
        />
    )
}

export default PrivateRoute;
