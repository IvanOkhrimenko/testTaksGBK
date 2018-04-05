import React from "react";
import './ImageUpload.css'

export default class ImageUpload extends React.Component {
  state = {
    file: "",
    imagePreviewUrl: this.props.imageSrc ? this.props.imageSrc : ""
  };

  handleSubmit = e => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      this.props.onImageUpload(reader.result);
    };

    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div className=" mdl-left ">
        <div className="acme-card mdl-card mdl-shadow--16dp">
        <img className="profileImg" src={this.state.imagePreviewUrl} alt="profile" />
        </div>
        <form onSubmit={this._handleSubmit}>
        <label className="choose input-custom-file mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
        Choose file
          <input type="file" onChange={this.handleImageChange} />
          </label>
        </form>
        
        </div>
    );
  }
}
