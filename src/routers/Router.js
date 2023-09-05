import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import Main from "../components/layout/Main";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageConsultants from "../pages/admin/ManageConsultants";
import Profile from "../pages/consultant/Profile";
import PrivateRoute from "./PrivateRoute";
import {SignIn} from "../pages/SignIn";
import AdminAppointments from "../pages/admin/AdminAppointments";
import ConsultantDashboard from "../pages/consultant/ConsultantDashboard";
import ConsultantAppointments from "../pages/consultant/ConsultantAppointments";
import ConsultantDetailForm from "../components/admin/consultant/ConsultantDetailForm";


function AppRouter() {
    let history = useHistory();

    return (
        <BrowserRouter>
            <Route path={"/login"} exact><SignIn history={history}/></Route>
            <Route path="/:path?">
                <Switch>
                    <Route path="/admin/:path?">
                        <Main>
                            <Switch>
                                <PrivateRoute
                                    privateRoles={"ADMIN"}
                                    path="/"
                                    exact
                                    component={AdminDashboard}
                                />
                                <PrivateRoute
                                    privateRoles={"ADMIN"}
                                    path="/admin/dashboard"
                                    exact
                                    component={AdminDashboard}
                                />
                                <PrivateRoute
                                    privateRoles={"ADMIN"}
                                    path="/admin/consultants"
                                    exact
                                    component={ManageConsultants}
                                />
                                <PrivateRoute
                                    privateRoles={"ADMIN"}
                                    path="/admin/appointments"
                                    exact
                                    component={AdminAppointments}
                                />
                                <PrivateRoute
                                    privateRoles={"ADMIN"}
                                    path="/admin/consultant-form/:consultantId"
                                    exact
                                    component={ConsultantDetailForm}
                                />
                            </Switch>
                        </Main>
                    </Route>
                    <Route path="/consultant/:path?">
                        <Main>
                            <Switch>
                                <PrivateRoute
                                    privateRoles={"CONSULTANT"}
                                    path="/consultant/"
                                    exact
                                    component={ConsultantDashboard}
                                />
                                <PrivateRoute
                                    privateRoles={"CONSULTANT"}
                                    path="/consultant/dashboard"
                                    exact
                                    component={ConsultantDashboard}
                                />
                                <PrivateRoute
                                    privateRoles={"CONSULTANT"}
                                    path="/consultant/appointments"
                                    exact
                                    component={ConsultantAppointments}
                                />
                                <PrivateRoute
                                    privateRoles={"CONSULTANT"}
                                    path="/consultant/profile"
                                    exact
                                    component={Profile}
                                />
                            </Switch>
                        </Main>
                    </Route>
                </Switch>
            </Route>
        </BrowserRouter>
    );
}

export default AppRouter;