import React, { Component } from 'react';
import './ChangeProfile.css';
import { Redirect } from 'react-router-dom';
import ImageUpload from "../ImageUpload/ImageUpload";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state ? this.props.location.state.user : {},
      this.onNameInputChange = this.onNameInputChange.bind(this),
      this.onLastNameInputChange = this.onLastNameInputChange.bind(this),
      this.onRadioInputChange = this.onRadioInputChange.bind(this),
      this.onSubmit = this.onSubmit.bind(this),
      this.state.redirect = false,
      console.log(this.state);

  }

  onNameInputChange(event) {
    this.setState({
      first_name: event.target.value,
      username:event.target.value

    });
    console.log(event.target.value);

  }
  onLastNameInputChange(event) {
    this.setState({
      last_name: event.target.value
    });
  }
  onRadioInputChange(event) {
    this.setState({
      gender: event.target.value

    });

  }
  onSubmit(event) {
    this.setState({
      redirect: true
    })
  }
  onImageUpload = imageSrc => {
    this.setState({
      image: { data: { url: imageSrc } }
    });
    console.log(this.state.image);
  };
  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: '/profile',
        state: { user: { ...this.state }, myProfileUser: { ...this.state } },
      }} />)
    }

    const image = this.state.image.data ? this.state.image.data.url : this.state.image

    const { first_name, last_name, gender } = this.state;



    return (

      <div className="content-grid mdl-grid">
        <div className="mdl-cell--5-col ">
          <ImageUpload
            imageSrc={image}
            onImageUpload={this.onImageUpload} />
        </div >
        <div className="mdl-cell--2-col">
          <input className='inputt mdl-textfield__input' type="text" onChange={this.onNameInputChange} value={first_name} />
          <input className='inputt mdl-textfield__input' type="text" onChange={this.onLastNameInputChange} value={last_name} />

          <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-1">
            <input type="radio" id="option-1" className="mdl-radio__button" name="options" value="male" onChange={this.onRadioInputChange} checked={gender === "male" ? true : false} />
            <span className="mdl-radio__label">Male</span>
          </label>
          <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-2">
            <input type="radio" id="option-2" className="mdl-radio__button" name="options" value="female" onChange={this.onRadioInputChange} checked={gender === "female" ? true : false} />
            <span className="mdl-radio__label">Female</span>
          </label>
          <div className="mdl-button-end">
            <label className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.onSubmit}>Save</label>
          </div>

        </div>
      </div>

    );
  }
}

export default Home;