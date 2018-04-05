import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UsersList extends Component {

    render() {
        let { filteredPersons } = this.props;

        return (
            <div className="contacts mdl-grid mdl-cell--10-col">
                {filteredPersons.map(el => {
                    return (
                        <li key={el.id} className=" contact mdl-grid mdl-cell--6-col" >
                            <Link to={{
                                pathname: `/profile/${el.id}/`,
                                state: { user: el, myProfileUser: this.props.myProfileUser }
                            }}>
                            
                                   <img
                                        className="contact-image mdl-cell mdl-cell--1-col mdl-shadow--8dp "
                                        src={
                                            el.image == null 
                                                ? (el.image =
                                                    `https://picsum.photos/330/330?image=${el.id}`)
                                                : el.image.data ? el.image.data.url : el.image
                                        }
                                        alt='Profile'
                                    />
                                    <div className="contact-info  mdl-cell mdl-cell--1-col  ">
                                        <div className="contact-name"> {el.username} </div>
                                            <div className="contact-number"> {el.country} </div>
                                            <div className="contact-number"> {el.city} </div>
                                    </div>
                            </Link>
                        </li>

                    );
                })}
            </div>


        );
    }
}
export default UsersList;