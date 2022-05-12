/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function. 
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk } from '../../store/thunks'; // Does not exist yet ... 

// Take in props data to construct the component
class EditCampusContainer extends Component {
  constructor(props) { // Create and initialize state
    super(props); // Always do super()
    this.state = {
        name: "", 
        address: "",
        description: "",
        imageUrl: "",
        id: -1,
        redirect: false, 
        errorCaught: false,
    }
  }

  componentDidMount() {
    this.setState({name: this.props.campus.name, 
        address: this.props.campus.address,
        description: this.props.campus.description,
        imageUrl: this.props.campus.imageUrl,
        id: this.props.campus.id});  // Store received data in state's object
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
      name: this.state.name,
      description: this.state.description,
      address: this.state.address,
      imageUrl: this.state.imageUrl,
      id: this.state.id
    };
    if (new_info.imageUrl === "") { // If imageUrl given was empty
      delete new_info.imageUrl; // Don't pass that to Sequelize
      // Give sequelize null instead so it will give the defaultValue.
    } // And so that allowNull will work

    // Somehow send this data to the backend and close up this EditCampus component
    // Edit campus in back-end database
      try {
        let campus = await this.props.editCampus(new_info)
        console.log(campus.id); // Will catch this error if editCampus failed. 
        alert(`${new_info.name}'s edit was saved.`); // Tell user
        // Update state, and trigger redirect to show the new campus
        this.setState({
          name: "", 
          address: "", 
          description: "",
          imageUrl: "",
          redirect: true, 
          id: -1
        });
      }
      catch(err) { // If errors doing the above, then: 
        console.error(err); // Output error and give alert to new information at bottom of page
        alert("Error with edit! Please follow the Campus Information guidelines found below");
        this.setState({
          errorCaught: true // Tell react to render new thing
        });
      }

  }
  
  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }
  
  // Render container for the form for editing the campus
  render() {
    // Redirect to campus' page after submit
    if(this.state.redirect) {
      window.location.reload(); // Reloads the page for updated state...
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <EditCampusView
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          campus={this.props.campus} // Pass down the campus that it is editing     
        />
        {this.state.errorCaught ? (
          <div>
            <br />
            <p>Campus name: No restraints, but cannot be null.</p>
            <p>Campus address: No restraints, but cannot be null.</p>
            <p>Campus Image: Should be a valid image link, or can be left blank.</p>
            <p>Campus Description: No restraints, and can be null.</p>
          </div>
        ) : (
          null
        )}
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(EditCampusContainer);