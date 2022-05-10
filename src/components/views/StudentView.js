/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, editing, toggleEdit, deleteStudent} = props;
  let gpa = student.gpa // Grab gpa
  if (gpa % 1 === 0) { // If whole number
    gpa = gpa.toFixed(1); // Display with extra decimal place
  }

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h2>{student.email}</h2>
      <img src={student.imageUrl} alt="Student Profile"/>
      {student.campus === null ? (
        <div>
          <h3>{student.firstname + " " + student.lastname} is not enrolled at a school.</h3>
          <h4>GPA: N/A</h4>
        </div>
      ) : (
        <div>
          <Link to={`/campus/${student.campus.id}`}>
            <h3>{student.campus.name}</h3>
          </Link>
          <h4>GPA: {gpa}</h4>
        </div>
      )}
      <br />
      {/* Was completely breaking the page, as the student/campus gets instant deleted, changed how onClick written */}
      <button onClick={() => {deleteStudent(student.id); alert("Student Deleted!")}}>Delete Student</button>
      <br />
      {editing ? (
        <button onClick={toggleEdit}>Quit Edit</button>
      ) : (
        <button onClick={toggleEdit}>Edit Student</button>
      )}
      <br />
    </div>
  );

};

export default StudentView;