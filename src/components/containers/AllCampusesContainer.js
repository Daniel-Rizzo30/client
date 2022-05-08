/*==================================================
/src/components/containers\AllCampusesContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllCampusesThunk } from "../../store/thunks";
import { AllCampusesView } from "../views";

class AllCampusesContainer extends Component {
  constructor(props) { // Create and initialize state
    super(props); // Always do super()
    this.state = {
        //editors: [],
    }
  }
  // Get all campuses data from back-end database
  componentDidMount() {
    console.log(this.props);
    this.props.fetchAllCampuses();
    // let editors = new Array(this.props.allCampuses.length); // Make array with elements of id, editor
    // for(let i = 0; i < editors.length; i++) {
    //   editors[i] = new Array(2); // Create array within array
    //   editors[i][0] = this.props.allCampuses[i].id; // Copy over id of ith Campus into the first element
    //   editors[i][1] = false; // Start with the actual value set to false
    // }
    // this.setState({
    //   editors: editors // Populate with zeros
    // });
  }

  // Function to switch editing on and off
  // toggleEdit = (id) => {
  //   let new_editors = this.state.editors;
  //   for(let i = 0; i < new_editors.length; i++) {
  //     if (new_editors[i][0] === id) {
  //       new_editors[i][1] = !this.state.editors[i][1]; // Flip the bit
  //       break; 
  //     }
  //   }
  //   this.setState({
  //     editors: new_editors // Save the toggle
  //   });
  // }

  // Render All Campuses view by passing all campuses data as props to the corresponding View component
  render() {
    return (
      <div>
        <Header />
        <AllCampusesView
        allCampuses={this.props.allCampuses}
        // toggleEdit={this.toggleEdit}
        // editors={this.state.editors}
        />
      </div>
    );
  }
}

// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "allCampuses".
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
  };
};  
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
  };
};

// Type check props;
AllCampusesContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
};

// Export store-connected container by default
// AllCampusesContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(AllCampusesContainer);