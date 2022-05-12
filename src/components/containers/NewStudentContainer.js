/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null, 
      redirect: false, 
      redirectId: null,
      errorCaught: false,
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        gpa: this.state.gpa,
        imageUrl: this.state.imageUrl,
        email: this.state.email,
    };
    if (student.imageUrl === "") { // If imageUrl given was empty
      delete student.imageUrl; // Don't pass that to Sequelize
      // Give sequelize null instead so it will give the defaultValue.
    }
    
    // Add new student in back-end database
    await this.props.addStudent(student)
      .then(newStudent => {
        console.log(newStudent);
        // Update state, and trigger redirect to show the new student
        this.setState({
          firstname: "", 
          lastname: "", 
          campusId: null, 
          redirect: true, 
          gpa: this.state.gpa,
          imageUrl: "",
          email: "",
          redirectId: newStudent.id // Will catch this error if the add failed
        });
      })
      .catch(err => { // If errors doing the above, then: 
        console.error(err); // Output error and give alert to new information at bottom of page
        alert("Error with add! Please follow the Student Information guidelines found at the bottom of the page");
        this.setState({
          errorCaught: true // Tell react to render new thing
        });
      });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
        {this.state.errorCaught ? (
          <div>
            <br />
            <p>Student First and Last names: Must be one capital letter followed by any amount of lowercase letters,
               cannot be null.</p>
            <p>Student's Campus ID: Must be a valid  and actual campus ID of a school within this database.</p>
            <p>Student Email: Must contain @ symbol, and be in standard email format, cannot be null.</p>
            <p>Student Image: Should be a valid image link, or can be left blank.</p>
            <p>Student GPA: Must be between 0.0 and 4.0.</p>
          </div>
        ) : (
          null
        )}
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);