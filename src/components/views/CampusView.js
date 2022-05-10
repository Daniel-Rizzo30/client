/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, editing, toggleEdit, deleteCampus} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <img src={campus.imageUrl} alt="Campus Profile"/>
      {campus.students.length === 0 ? (
        <h2>No students enrolled at {campus.name}.</h2>
      ) : (
        campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>             
            </div>
          );
        })
      )}
      <br /> 
      {/* Was completely breaking the page, as the student/campus gets instant deleted, changed how onClick written */}
      <button onClick={() => {props.deleteCampus(campus.id); alert("Campus Deleted!")}}>Delete Campus</button>
      <br/>
      {editing ? (
        <button onClick={toggleEdit}>Quit Edit</button>
      ) : (
        <button onClick={toggleEdit}>Edit Campus</button>
      )}
      <br />
    </div>
  );
};

export default CampusView;