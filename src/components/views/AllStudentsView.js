/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import { EditStudentContainer } from "../containers/index"

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>

      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <br/><br/>

      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          let url = student.imageUrl;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <h3>{student.email}</h3>
              {/* image may have to be coded in css file to be a certain percentage of the screen so that it isnt massive */}
              <img src={url} alt="Student Profile"/>
              <EditStudentContainer student={student}/>
              <br/>
              <button onClick={() => deleteStudent(student.id)}>Delete</button>
              <hr/>
            </div>
          );
        }
      )}
      <br/>
    </div>
  );
};


export default AllStudentsView;