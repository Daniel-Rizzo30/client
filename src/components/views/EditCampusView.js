/*==================================================
EditCampusView.js

The Views component is responsible for rendering a portion of the webpage for editing 
a campus when it is desired. 
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
const EditCampusView = (props) => {
  const classes = useStyles(); // Should I use this?
  const {handleChange, handleSubmit, campus} = props;
  
  // Render a form for editing the campus

    return (
      <div>
        <h1>Edit {campus.name}</h1>
        {/* Make a form, which uses handleSubmit to access the props functions from App.js */}  
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
          type="text" 
          name="name"
          placeholder='School Name' // Add a placeholder that tells the user what to input
          value={campus.name} // Keep the value in state
          onChange={(e) => handleChange(e)} // Change state when the value changes
          />
          <input 
          type="text" 
          name="address"
          placeholder='School Address'
          value={campus.address}
          onChange={(e) => handleChange(e)}  
          />
          <input 
          type="text" 
          name="description"
          placeholder="Description"
          value={campus.description}
          onChange={(e) => handleChange(e)}  
          />
          <input 
          type="text" 
          name="imageUrl"
          placeholder='Profile Picture'
          value={campus.imageUrl}
          onChange={(e) => handleChange(e)}  
          />
          <button type="submit">Save Campus Edit</button>
        </form>
    </div>
  )
}

export default EditCampusView;