/*==================================================
EditStudentView.js

The Views component is responsible for rendering a portion of the webpage for editing 
a Student when it is desired. 
================================================== */
//import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

// Take in props data to construct the component
const EditStudentView = (props) => {
  const classes = useStyles(); // Should I use this?
  const {handleChange, handleSubmit, student} = props;
  
  // Render a form for editing the student

    return (
      <div>
        <h1>Edit {student.firstname} {student.lastname}</h1>
        {/* Make a form, which uses handleSubmit to access the props functions from App.js */}  
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
          type="text" 
          name="firstname"
          placeholder='Student First Name' // Add a placeholder that tells the user what to input
          defaultValue={student.firstname} // Keep the value in state
          onChange={(e) => handleChange(e)} // Change state when the value changes
          />
          <br/>
          <input 
          type="text" 
          name="lastname"
          placeholder="Student's Last Name"
          defaultValue={student.lastname}
          onChange={(e) => handleChange(e)}  
          />
          <br/>
          <input 
          type="text" 
          name="email"
          placeholder="Email"
          defaultValue={student.email}
          onChange={(e) => handleChange(e)}  
          />
          <br/>
          <input 
          type="text" 
          name="gpa"
          placeholder="GPA"
          defaultValue={student.gpa}
          onChange={(e) => handleChange(e)}  
          />
          <br/>
          <input 
          type="text" 
          name="imageUrl"
          placeholder='Profile Picture'
          defaultValue={student.imageUrl}
          onChange={(e) => handleChange(e)}  
          />
          <br/>
          <input 
          type="text" 
          name="campusId"
          placeholder="ID of Student's School"
          defaultValue={student.campusId}
          onChange={(e) => handleChange(e)}  
          />
          <br/>
          <button type="submit">Save Student Edit</button>
        </form>
    </div>
  )
}

export default EditStudentView;