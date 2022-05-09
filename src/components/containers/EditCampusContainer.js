/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function. 
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
        redirectId: null,
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

    // Somehow send this data to the backend and close up this EditCampus component
    // Edit campus in back-end database
    let editedCampus = await this.props.editCampus(new_info); 
    console.log(editedCampus)

    // Update state, and trigger redirect to show the updated info
    this.setState({
        name: "", 
        address: "",
        description: "",
        imageUrl: "",
        id: -1,
        redirect: true, 
        //redirectId: editedCampus.id
    });

  }
  
  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }
  
  // Render container for the form for editing the campus
  render() {
    // Redirect to campus' page after submit
    if(this.state.redirect) {
      // return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
      window.location.reload(); // Is this okay?         ????????????????????
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <EditCampusView
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          campus={this.props.campus} // Pass down the campus that it is editing     
        />
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