import React from "react";
import "./style.css";

class MyNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isDisplay: false,
      isEdit: false,
      title: "",
      note: "",
      selectedIndex: -1
    };
  }

  displayNote = (item, index) => {
    this.setState({
      isEdit: false,
      isDisplay: true,
      title: item.title,
      note: item.note,
      selectedIndex: index
    });
  };

  componentDidMount() {
    this.props.firebaseRef.on("value", snapshot => {
      if (snapshot.hasChild(this.props.googleId)) {
        const state = snapshot.child(this.props.googleId).val();

        let temp = [];

        Object.keys(state).map(key =>
          temp.push({
            title: state[key].title,
            note: state[key].note,
            key: key
          })
        );

        this.setState({
          data: temp
        });
      }
    });
  }

  edit = () => {
    this.setState({
      isEdit: true
    });
  };

  delete = () => {
    this.props.firebaseRef
      .child(this.props.googleId)
      .child(this.state.data[this.state.selectedIndex].key)
      .remove();

    let temp = this.state.data;
    temp.splice(this.state.selectedIndex, 1);

    this.setState({
      data: temp,
      isDisplay: false,
      isEdit: false,
      title: "",
      note: "",
      selectedIndex: -1
    });
  };

  cancel = () => {
    this.setState({
      isEdit: false,
      title: this.state.data[this.state.selectedIndex].title,
      note: this.state.data[this.state.selectedIndex].note
    });
    document.getElementById("form").reset();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  save = () => {
    this.props.firebaseRef
      .child(this.props.googleId)
      .child(this.state.data[this.state.selectedIndex].key)
      .set({ title: this.state.title.trim(), note: this.state.note.trim() });
    this.setState({
      isEdit: false
    });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div className="sidebar">
          {this.state.data.map((item, index) => (
            <p
              className={
                this.state.selectedIndex === index ? "selectedItem" : "li"
              }
              key={index}
              onClick={() => this.displayNote(item, index)}
            >
              {item.title}
            </p>
          ))}
        </div>
        {this.state.isDisplay && (
          <div id="noteDisplay" key={this.state.selectedIndex}>
            <form id="form">
              <input
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                maxLength="50"
                required
                defaultValue={this.state.title}
                readOnly={!this.state.isEdit}
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
                defaultValue={this.state.note}
                readOnly={!this.state.isEdit}
                onChange={this.handleChange}
              ></textarea>
            </form>
            {this.state.isEdit ? (
              <div style={{ display: "flex" }}>
                <p id="cancelEdit" onClick={this.cancel}>
                  Cancel
                </p>
                <p id="saveEdit" onClick={this.save}>
                  Save
                </p>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <p id="delete" onClick={this.delete}>
                  Delete
                </p>
                <p id="edit" onClick={this.edit}>
                  Edit
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MyNotes;
