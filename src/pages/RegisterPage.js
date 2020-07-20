import React from "react";
import Register from "../components/Auth/Register";
import { client } from "../Client";
import { connect } from "react-redux";
import Popup from "../components/Auth/Popup";

import { companiesFetchData } from "../redux/actions/companies";

class RegisterPage extends React.PureComponent {

    state = {
        fields: {
            email: '',
            password: '',
            rePassword: '',
            firstName: '',
            lastName: '',
            birthDate: '2017-05-24',
            sex: 'male',
            avatarUrl: '',
            jsExperience: '',
            reactExperience: '',
            companyId: ''
        },
        errors: {},
        popup: {
            isOpened: false,
            text: '',
            processing: false,
        },
        avatarFile: ''
    };

    componentDidMount() {
        if (client.isLoggedIn()) {
            this.props.history.push('/main')
        }
        this.props.fetchData();
    }

    handleInputChange = async (e) => {
        let { value, name, files } = e.target;

        if (!isNaN(value)) {
            value = +value;
        }

        await this.setState(state => ({
            ...state,
            fields: {
                ...state.fields,
                [name]: value
            }
        }));

        if (name === 'avatarUrl') {
            this.setState({ avatarFile: files[0] })
        }

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

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...this.state.fields };
        const photo = this.state.avatarFile;
        const errors = this.validate(data);
        await this.setState({ errors });
        if (Object.keys(errors).length) return;

        this.openPopup(true);

        client.postRegister(data, photo)
            .then((res) => {
                if (res.ok) {
                    res.text()
                        .then(text => {
                            this.openPopup(false, text);
                            setTimeout(() => this.props.history.push('/login'), 2000);
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
            .catch((e) => {
                alert('Registration Failed, please reload page');
            })

    };


    validate = (fields) => {

        const re = /^(([^<>()\]\\z.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        let errors = {};

        for (const el in fields) {

            if (el === 'jsExperience' || el === 'ReactExperience') {
                break
            }
            if (!fields[el]) {
                errors[el] = 'Please fill field';
            }

            if (el === 'email' && fields[el] && !re.test(fields[el])) {
                errors[el] = 'Not Valid Email'
            }


        }
        return errors;
    };

    render() {

        const { fields, errors, popup: { isOpened, text, processing } } = this.state;

        return (
            <div className={'container'}>
                <Register
                    handleInputChange={this.handleInputChange}
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(companiesFetchData())
    };
};

export default connect(null, mapDispatchToProps)(RegisterPage);