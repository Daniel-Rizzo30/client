/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, 
         deleteCampusThunk,
         editStudentThunk, // For editing a student when button is pressed
         fetchAllStudentsThunk // For checking if student can be added/dropped from the campus
       } from "../../store/thunks";
import { EditCampusContainer } from "./index"
import { CampusView } from "../views";

class CampusContainer extends Component {
  constructor(props) { // Create and initialize state
    super(props); // Always do super()
    this.state = {
        editor: false,
    }
  }
  
  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
    this.props.fetchAllStudents(); // Will automatically save allStudents into props ?

  }

  // Function to switch editing on and off
  toggleEdit = () => {
    let new_editor = !this.state.editor;
    this.setState({
      editor: new_editor // Toggle it
    });
  }

  dropStudent = async (campusId, studentId) => {
    let droppable = false; // Set flag
    let studentPlace = -1;
    for(let i = 0; i < this.props.allStudents.length; i++) {
      if(this.props.allStudents[i].id.toString() === studentId) { // If this is the student, change id to string for comparison
        console.log("Found studentId");
        studentPlace = i; // Save their spot in the array
        // and they're already enrolled, they're droppable
        if(this.props.allStudents[i].campusId !== null && this.props.allStudents[i].campusId.toString() !== campusId) { 
          console.log("Droppable!")
          droppable = true; // They can be dropped
        }
        break; // Break for loop either way
      }
    }
    if(droppable) { // If they can be dropped
      let new_info = this.props.allStudents[studentPlace]; // Copy their info
      console.log(new_info); // Output to console to check
      new_info.campusId = null; // Clobber their campus id, will also update their .campus information
      // Somehow send this data to the backend and close up this EditStudent component
      // Edit student in back-end database
      let editedStudent = await this.props.editStudent(new_info);
      window.location.reload(); // Reload for changes
    }
  }

  enrollStudent = async (campusId, studentId) => {
    let addable = false; // Set flag
    let studentPlace = -1;
    console.log(studentId, " is student ID")
    for(let i = 0; i < this.props.allStudents.length; i++) {
      if(this.props.allStudents[i].id.toString() === studentId) { // If this is the student, change id to string for comparison
        console.log("Found studentId");
        studentPlace = i; // Save their spot in the array
        // and they're not already enrolled, they're addable
        if(this.props.allStudents[i].campusId === null || this.props.allStudents[i].campusId.toString() !== campusId) {
          console.log("Addable!")
          addable = true; // They can be added
        }
        break; // Break for loop either way
      }
    }
    if(addable) { // If they can be dropped
      let new_info = this.props.allStudents[studentPlace]; // Copy their info
      console.log(new_info); // Output to console to check
      new_info.campusId = parseInt(campusId); // Change their campusId, save as an int, will also update their .campus information
      // Somehow send this data to the backend and close up this EditStudent component
      // Edit student in back-end database
      let editedStudent = await this.props.editStudent(new_info);
      window.location.reload(); // Reload for changes
    }
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    return ( // Add function as props to CampusView to toggle editor on/off
      <div>
        <Header />
        <CampusView 
        campus={this.props.campus}
        toggleEdit={this.toggleEdit}
        editing={this.state.editor} 
        deleteCampus={this.props.deleteCampus}
        enrollStudent={this.enrollStudent}
        dropStudent={this.dropStudent}
        /> 
        {this.state.editor ? (
          <EditCampusContainer campus={this.props.campus}/>
        ) : (
          null // don't do anything
        )}
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
    allStudents: state.allStudents,  // Get the State object from Reducer "allStudents"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
    editStudent: (id) => dispatch(editStudentThunk(id)),
    fetchAllStudents: (id) => dispatch(fetchAllStudentsThunk())
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);