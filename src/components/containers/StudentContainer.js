/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, 
         deleteStudentThunk } from "../../store/thunks";
import { EditStudentContainer } from "./index"
import { StudentView } from "../views";

class StudentContainer extends Component {
  constructor(props) { // Create and initialize state
    super(props); // Always do super()
    this.state = {
        editor: false,
    }
  }

  // Get student data from back-end database
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Function to switch editing on and off
  toggleEdit = () => {
    let new_editor = !this.state.editor;
    this.setState({
      editor: new_editor // Toggle it
    });
  }

  // Render Student view by passing student data as props to the corresponding View component
  render() {
    if (!this.props.student) { // If student doesn't exist
      return (
        <h1>Student not found!</h1> // Return this so that /students/<random-id> doesn't crash
      ); // Especially right after a student is just deleted a page refresh/going back to the page is a bad look
    }
    return (
      <div>
        <Header />
        <StudentView 
        student={this.props.student}
        toggleEdit={this.toggleEdit}
        editing={this.state.editor} 
        deleteStudent={this.props.deleteStudent}
        /> 
        {this.state.editor ? (
          <EditStudentContainer student={this.props.student}/>
        ) : (
          null // don't do anything
        )}
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    deleteStudent: (id) => dispatch(deleteStudentThunk(id))
  };
};

// Export store-connected container by default
// StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(StudentContainer);