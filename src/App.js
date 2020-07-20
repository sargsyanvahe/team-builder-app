import React from 'react';
import Header from "./components/Header/Header";
import RegisterPage from "./pages/RegisterPage";
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from "./PrivateRouting";
import LoginPage from "./pages/LoginPage";
import TeamsPage from "./pages/TeamsPage";
import { connect } from "react-redux";
import { getUserInfoFetch } from "./redux/actions/user";
import { client } from "./Client";
import NotFound from "./components/NotFound/NotFound";
import ProfilePage from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectsPage";
import TopicsPage from "./pages/TopicsPage";

class App extends React.Component {

    componentDidMount() {
        if (client.isLoggedIn()) {
            this.props.getUserData()
        }
    }

    render() {

        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Redirect exact from={'/'} to={'/teams'}/>
                    <Route exact path={'/login'} component={LoginPage}/>
                    <Route exact path={'/register'} component={RegisterPage}/>
                    <PrivateRoute exact path={'/teams'} component={TeamsPage}/>
                    <PrivateRoute exact path={'/profile'} component={ProfilePage}/>
                    <PrivateRoute exact path={'/projects'} component={ProjectsPage}/>
                    <PrivateRoute exact path={'/topics'} component={TopicsPage}/>
                    <Route exact path={'/404'} component={NotFound}/>
                    <Redirect from='*' to='/404'/>
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: () => dispatch(getUserInfoFetch())
    }
};


export default connect(null, mapDispatchToProps)(App);
