import React from "react";
import { Redirect } from 'react-router-dom';
import { client } from "../Client";
import { connect } from "react-redux";

import Popup from "../components/Auth/Popup";
import Login from "../components/Auth/Login";

import { getUserInfoFetch } from "../redux/actions/user";

class LoginPage extends React.PureComponent {

    state = {
        fields: {
            email: '',
            password: '',
            remember: false
        },
        errors: {},
        shouldRedirect: false,
        popup: {
            isOpened: false,
            text: '',
            processing: false,
        },
    };

    componentDidMount() {
        if (client.isLoggedIn()) {
            this.props.history.push('/main')
        }
    }

    redirectPath = () => {
        const locationState = this.props.location.state;
        const pathname = (
            locationState && locationState.from && locationState.from.pathname
        );
        return pathname || '/teams';
    };

    handleInputChange = (e) => {
        const { value, name, checked } = e.target;
        this.setState(state => ({
            ...state,
            fields: {
                ...state.fields,
                [name]: name === 'remember' ? checked : value
            }
        }))
    };

    openPopup = (processing, text = '') => {

        this.setState(state => ({
            ...state,
            popup: {
                isOpened: true,
                text,
                processing
            }
        }));

    };

    closePopup = () => {

        this.setState(state => ({
            ...state,
            popup: {
                ...state.popup,
                isOpened: false,
            }
        }));

    };


    handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...this.state.fields };
        const remember = data.remember;
        delete data['remember'];
        const errors = this.validate(data);
        this.setState({ errors });
        if (Object.keys(errors).length) return;
        this.openPopup(true);

        client.login(data)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(({ token }) => {
                            remember ? client.setTokenLocalStorage(token) : client.setTokenSessionStorage(token);
                            this.props.getUserInfo()
                            this.setState({ shouldRedirect: true })
                        })
                } else {
                    res.text()
                        .then(text => {
                            this.openPopup(false, text);
                            setTimeout(() => {
                                this.closePopup();
                            }, 2000)
                        })
                }
            })
    };


    validate = (fields) => {

        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        let errors = {};

        for (const el in fields) {

            if (el === 'remember') {
                break
            } else {
                if (!fields[el]) {
                    errors[el] = 'Please fill field';
                }

                if (el === 'email' && fields[el] && !re.test(fields[el])) {
                    errors[el] = 'Not Valid Email'
                }
            }

        }
        return errors;
    };

    render() {

        const { shouldRedirect, fields, errors, popup: { isOpened, text, processing } } = this.state;
        // const { fields, errors, popup: { isOpened, text, processing } } = this.state;

        if (shouldRedirect) {
            return (
                <Redirect to={this.redirectPath()}/>
            );
        }
        return (
            <div className={'container'}>
                <Login handleInputChange={this.handleInputChange}
                       handleSubmit={this.handleSubmit}
                       fields={fields}
                       processing={processing}
                       errors={errors}
                />
                <Popup isOpened={isOpened} processing={processing} text={text}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({ getUserInfo: () => dispatch(getUserInfoFetch()) });

export default connect(null, mapDispatchToProps)(LoginPage);