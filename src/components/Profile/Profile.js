import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state ? this.props.location.state : {};
        this.state.redirect = false;
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(this.props.location.state)
        if (id && !this.state.user) {
            axios
                .get(`https://test-api.live.gbksoft.net/rest/v1/user/${id}`)
                .then(res => {
                    const user = res.data.result;
                    this.setState({ user });
                })
        }
    }
    onSubmit = (event) => {
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect) {
            console.log("This is 33 : ", this.state);
            return (<Redirect to={{
                pathname: '/userslist',
                state: { myProfileUser: { ...this.state.myProfileUser }, user: { ...this.state.myProfileUser } }
            }} />)
        }
        let image = null;
        const id = this.props.match.params.id;
        const user = this.state.user || this.state.myProfileUser;
        if (!user) {
            return <Spinner />
        } if (user.image) {
            image = user.image;
        }
        const { first_name, last_name, gender, country, username, city } = user;

        const imageSrc = image === null ?
            `https://picsum.photos/330/330?image=${id}`
            : image.data ? image.data.url : image

        return (

            <div className="content-grid mdl-grid">
                <div className="mdl-cell--5-col ">
                    <img className='profileImg mdl-shadow--16dp' src={imageSrc} alt="profile " />
                </div>
                <div className="mdl-cell--2-col">

                    <div>{first_name === "" || first_name === null ? username : first_name} {last_name === "" ? "" : last_name}</div>
                    <div>{country === undefined || country === null ? "Unknown" : country}</div>
                    <div>{city === undefined || city === null ? "Unknown" : city}</div>
                    <div className="mdl-gender">{gender}</div>
                    
                    <div className="mdl-button-end">
                    {id == this.state.myProfileUser.id?
                        <label className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-link-edit">
                            <Link to={{
                            pathname: '/changeprofile',
                            state: { myProfileUser: { ...this.state.myProfileUser }, user: { ...this.state.myProfileUser } }
                        }}>
                        Edit profile
                        </Link></label>
                        :null     
                  }
                        <label className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-link" onClick={this.onSubmit}>Go to List</label>
                        
                    </div>
                </div>
            </div>
        )
    }

}
export default Profile;