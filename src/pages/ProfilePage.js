import React from "react";
import { connect } from "react-redux";
import { client } from "../Client";

import Popup from "../components/Auth/Popup";
import ProfilePicture from "../components/ProfilePicture/ProfilePicture";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";

import { getUserInfoFetch } from "../redux/actions/user";
import { companiesFetchData } from "../redux/actions/companies";

class RegisterPage extends React.PureComponent {

    state = {
        fields: {},
        errors: {},
        popup: {
            isOpened: false,
            text: '',
            processing: false,
        },
        isEditable: false
    };

    componentDidMount() {
        this.props.getCompanies();
        this.props.getUserInfo();
    }

    handleInputChange = (e) => {
        let { value, name } = e.target;
        if (!isNaN(value)) {
            value = +value;
        }

        this.setState(state => ({
            ...state,
            fields: {
                ...state.fields,
                [name]: value
            }
        }));

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

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props !== nextProps) {
            this.setState({
                fields: nextProps.user
            })
        }
    }

    closePopup = () => {

        this.setState(state => ({
            ...state,
            popup: {
                ...state.popup,
                isOpened: false,
            }
        }));

    };

    findDiffInObj = (prev, now) => {
        const data = {};

        for (const key in prev) {
            if (prev[key] !== now[key]) {
                data[[key]] = now[key];
            }
        }
        return data;
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = { ...this.state.fields };
        const prevData = this.props.user;
        const errors = this.validate(data);
        await this.setState({ errors });

        if (Object.keys(errors).length) return;

        this.openPopup(true);
        const updateData = this.findDiffInObj(prevData, data)
        client.editUserData(updateData)
            .then((res) => {
                if (res.ok) {
                    res.text()
                        .then(text => {
                            this.openPopup(false, text);
                            setTimeout(() => {
                                this.closePopup();
                                this.setState({ isEditable: false })
                            }, 2000)
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
                alert('Saving Failed, please reload page');
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

        const { fields, errors, isEditable, popup: { isOpened, text, processing } } = this.state;
        const { companies } = this.props;
        return (
            <div className={'container profile-page'}>
                <ProfilePicture avatarUrl={fields.avatarUrl}/>
                <ProfileInfo errors={errors} handleSubmit={this.handleSubmit}
                             handleInputChange={this.handleInputChange}
                             isEditable={isEditable}
                             handleEdit={() => this.setState({ isEditable: true })} fields={fields}
                             companies={companies}/>
                <Popup isOpened={isOpened} processing={processing} text={text}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanies: () => dispatch(companiesFetchData()),
        getUserInfo: () => dispatch(getUserInfoFetch())
    };
};

const mapStateToProps = state => ({
    user: state.user,
    companies: state.companies,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);