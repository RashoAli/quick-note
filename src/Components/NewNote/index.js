import React from "react";
import "./style.css";

class NewNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      note: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  save = () => {
    if (this.state.title.length && this.state.note.length) {
      this.props.firebaseRef
        .child(this.props.googleId)
        .push()
        .set({ title: this.state.title.trim(), note: this.state.note.trim() });
      this.setState({ title: "", note: "" });
    }
  };

  render() {
    return (
      <div id="contact">
        <form>
          <input
            id="title"
            name="title"
            placeholder="Title"
            type="text"
            maxLength="50"
            required
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          <textarea
            id="note"
            name="note"
            placeholder="Type your note here . . ."
            rows="10"
            maxLength="1000"
            required
            value={this.state.note}
            onChange={this.handleChange}
          ></textarea>
        </form>
        <p id="save" onClick={this.save}>
          Save
        </p>
      </div>
    );
  }
}

export default NewNote;
