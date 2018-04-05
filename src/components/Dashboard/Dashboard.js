import React, { Component } from "react";
import { Link, NavLink, Switch, Route } from "react-router-dom";
import axios from "axios";
import Map from "../Map/Map";
import UsersList from "../UsersList/UsersList";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

  }
  state = {
    myProfileUser: this.props.location.state.myProfileUser,
    persons: {},
    searchQuery: ""
  };

  componentDidMount() {
    axios
      .get(`https://test-api.live.gbksoft.net/rest/v1/user?page=1&per-page=60`)
      .then(res => {
        const persons = res.data.result;
        const myProfile = this.props.location.state
          ? this.props.location.state.user
          : null;
        this.setState({
          persons: myProfile ? persons.concat(myProfile) : persons,
          myProfileUrl: myProfile.id,
        });
      });
  }
  handleSearch = event => {
    this.setState({
      searchQuery: event.target.value.toLowerCase()
    });
  };
  onSubmit(event) {
    this.setState({
      redirect: true
    });
  }
  render() {

    if (this.state.persons && this.state.persons.length > 0)
      console.log(this.state.persons);
    else
      return (
        <ul>
          {" "}
          <div> </div>
        </ul>
      );

    const filteredPersons = this.state.persons.filter(
      user => {

        return user.username.toLowerCase().indexOf(this.state.searchQuery) !== -1;
      }
    );

    return (
      <div >
        <header className="mdl-layout mdl-shadow--8dp ">
          <nav className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-grid center-items ">

            <div className="mdl-layout__tab map-stype-dashboard mdl-button mdl-js-button mdl-button--raised mdl-button--colored map-list-components ">
              <NavLink to="/userslist">
                List
                </NavLink>
            </div>
            <div className="mdl-layout__tab map-stype-dashboard mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
              <NavLink to="/map">
                Map
                </NavLink>
            </div>


            <div className="dl-textfield__input search-input">
              <input
                placeholder="Search"
                type="text"
                className="search-field"
                onChange={this.handleSearch}
              />

            </div>

            <Link
              to={{
                pathname: `/profile/${this.state.myProfileUrl}/`,
                state: { myProfileUser: this.state.myProfileUser, user: this.state.user }
              }}
            >
              <label className="mdl-layout__tab map-stype-dashboard mdl-button mdl-js-button mdl-button--raised mdl-button--colored myprofile-style-dashboard">My profile</label>
            </Link>
          </nav>
        </header >
        <main>
          <Switch>
            <Route
              exact
              path="/userslist"
              render={() => <UsersList filteredPersons={filteredPersons} fbProfileId={this.state.myProfileUrl} myProfileUser={this.state.myProfileUser} />}
            />
            <Route
              path="/map"
              render={() => <Map filteredPersonsForMap={filteredPersons} fbProfileId={this.state.myProfileUrl} myProfileUser={this.state.myProfileUser} />}
            />
          </Switch>
        </main>
      </div >
    );
  }
}
export default Dashboard;
