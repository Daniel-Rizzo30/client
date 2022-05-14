/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { EditCampusContainer } from "../containers/index"

const AllCampusesView = (props) => {
  // const {allCampuses, editors, toggleEdit, deleteCampus} = props;
  const {allCampuses, deleteCampus, toggleEdit, editing} = props;
  // If there is no campus, display a message.
  if (!allCampuses.length) {
    return (<div>
    <p>There are no campuses.</p>
    <Link to={`/newcampus`}>
      <button>Add New Campus</button>
    </Link>
  </div>
  )}

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br />
      {editing ? (
        <button onClick={toggleEdit}>Quit Editing</button>
      ) : (
        <button onClick={toggleEdit}>Edit Campuses</button>
      )}
      <br/><br/>

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
          <br/>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <br />
          {editing ? (
          <EditCampusContainer campus={campus}/>
          ) : (
            null // don't do anything
          )}
          <hr/>
        </div>
      ))}
      <br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;