/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function. 
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';
import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks'; // Does not exist yet ... 

// Take in props data to construct the component
class EditStudentContainer extends Component {
  constructor(props) { // Create and initialize state
    super(props); // Always do super()
    this.state = {
        firstname: "", 
        lastname: "",
        gpa: -1,
        email: "",
        imageUrl: "",
        id: -1,
        campusId: -1, // The school's id that this student belongs to
        redirect: false, 
        errorCaught: false,
    }
  }

  componentDidMount() {
    this.setState({firstname: this.props.student.firstname,
        lastname: this.props.student.lastname, 
        gpa: this.props.student.gpa,
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl,
        campusId: this.props.student.campusId,
        id: this.props.student.id});  // Store received data in state's object
  }

  handleChange = (event) => {
    const {name, value, type, checked} = event.target
    // if the type just grabbed from the event is a checkbox, set the name of the event, 
    // which is named after an element in the state - so the element in the state - to 
    // the boolean checked, otherwise set [name], in state, to the value grabbed. 
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  } 
  
  handleSubmit = async event =>  {
    event.preventDefault(); // Stop page refresh

    let new_info = { // Grab info from state
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      gpa: this.state.gpa,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      campusId: this.state.campusId,
      id: this.state.id
    };
    if (new_info.imageUrl === "") { // If imageUrl given was empty
      delete new_info.imageUrl; // Don't pass that to Sequelize
      // Give sequelize null instead so it will give the defaultValue.
    }

    // Somehow send this data to the backend and close up this EditStudent component
    // Edit student in back-end database
      try {
        let student = await this.props.editStudent(new_info) // await
        console.log(student.id); // Will catch this error if editStudent failed. 
        alert(`${new_info.firstname} ${new_info.lastname}'s edit was saved.`); // Tell user
        // Update state, and trigger redirect to show the new student
        this.setState({
          firstname: "", 
          lastname: "",
          gpa: -1,
          email: "",
          imageUrl: "",
          id: -1,
          campusId: -1,
          redirect: true, 
        });
      }
      catch(err) { // If errors doing the above, then: 
        console.error(err); // Output error and give alert to new information at bottom of page
        alert("Error with edit! Please follow the Student Information guidelines found below");
        this.setState({
          errorCaught: true // Tell react to render new thing
        });
      };
  }
  
  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }
  
  // Render container for the form for editing the student
  render() {
    // Redirect to student's page after submit
    if(this.state.redirect) {
      window.location.reload(); // Reload for updated state....
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <EditStudentView
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.props.student} // Pass down the student that it is editing     
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

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(EditStudentContainer);