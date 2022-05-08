/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { EditCampusContainer } from "../containers/index"

const AllCampusesView = (props) => {
  const {allCampuses, editors, toggleEdit} = props;
  // If there is no campus, display a message.
  if (!allCampuses.length) {
    return <div>There are no campuses.</div>;
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>Campus ID: {campus.id}</h4>
          {/* image may have to be coded in css file to be a certain percentage of the screen so that it isnt massive */}
          <img src={campus.imageUrl} alt="Campus Profile"/>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <EditCampusContainer campus={campus}/>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;