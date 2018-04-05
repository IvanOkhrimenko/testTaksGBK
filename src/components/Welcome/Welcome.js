import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { PostData } from '../../services/PostData';
import { Redirect } from 'react-router-dom';
import './Welcome.css';
import 'material-design-lite';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            last_name: null,
            first_name: null,
            img: null,
            gender: null,
            hometown: null
        };
        this.signup = this
            .signup
            .bind(this);
    }

    signup(res, type) {
        let postData;
        if (type === 'facebook' && res.email) {
            postData = {
                username: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url,
                lat:res.latitude,
                lon:res.longitude,
            };
        }


        if (postData) {
            PostData('signup', postData).then((result) => {
                let responseJson = result;
                sessionStorage.setItem("userData", JSON.stringify(responseJson));
                this.setState({ redirect: true });
            });
        } else { }
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={{
                pathname: '/changeprofile',
                state: { user: { ...this.state } }
            }} />)
        }

        const responseFacebook = (response) => {

            this.signup(response, 'facebook');
            this.setState({
                id: parseInt(response.id),
                username: response.first_name,
                email:response.email,
                first_name: response.first_name,
                last_name: response.last_name,
                image: response.picture.data.url,
                gender: response.gender,
                country: response.hometown,
                city: response.hometown,
                lat:response.latitude,
                lon:response.longitude,
            })

        }

        return (
            <div className="alert alert-primary welcome-page center-items">
            <div className="mdl-cell mdl-cell--5-col mdl-cell--4-offset mdl-cell">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Welcome</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    <p>Click on the button below to login</p>
                </div>
               
                <FacebookLogin
                    appId="175999963047839"
                    autoLoad={false}
                    fields="name,email,picture, first_name, last_name, gender, hometown, birthday"
                    callback={responseFacebook} /></div>
                    </div>
               
           
        );
    }
}

export default Welcome;