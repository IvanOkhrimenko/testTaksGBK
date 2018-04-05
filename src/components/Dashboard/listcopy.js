import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Profile from "../Profile/Profile";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "./List.css";
const getRandomNumber = (min, max) => parseInt(Math.random() * (max - min) + min);

class List extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this),
      this.state.redirect = false
  }

  state = {
    persons: {},
    searchQuery: "",
  };

  componentDidMount() {
    axios
      .get(`https://test-api.live.gbksoft.net/rest/v1/user?page=1&per-page=60`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      });
  }
  handleSearch = (event) => {
    this.setState({
      searchQuery: event.target.value.toLowerCase(),
    });
  }
  onSubmit(event) {
    this.setState({
      redirect: true
    })
  }
  render() {
    if (this.state.redirect) {
      const filteredPersonsForMap = this.state.persons.result
        .filter(user => user.username.toLowerCase().indexOf(this.state.searchQuery) !== -1);
      return (<Redirect to={{
        pathname: '/map',
        state: { filteredPersonsForMap }
      }} />)
    }
    const styles = {
      width: 100,
      heigth: 100
    };

    if (this.state.persons.result && this.state.persons.result.length > 0)
      console.log();
    else
      return (
        <ul>
          {" "}
          <div> </div>
        </ul>
      );

    const filteredPersons = this.state.persons.result
      .filter(user => user.username.toLowerCase().indexOf(this.state.searchQuery) !== -1);

    return (
      <div className="contacts">
        <button className="mdl-button mdl-js-button mdl-button--primary" onClick={this.onSubmit}>Map</button>
        <ul className="contacts-list">
          <input
            type="text"
            className="search-field"
            onChange={this.handleSearch}
          />
          <div>
            {filteredPersons.map(function (el) {
              return (
                <li key={el.id} className="contact" >
                  <Link to={`/profile/${el.id}`}>
                    <img
                      className="contact-image"
                      style={styles}
                      src={
                        el.image == null
                          ? (el.image =
                            `https://picsum.photos/330/330?image=${el.id}`)
                          : el.image
                      }

                    />
                    <div className="contact-info">
                      <div className="contact-name"> {el.username} </div>
                      <div className="contact-number"> {el.country} </div>
                    </div>
                  </Link>
                </li>

              );
            })}
          </div>
        </ul>
      </div>
    );
  }
}
export default List;
