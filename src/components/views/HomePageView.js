/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  image: {
    maxWidth: '60%',
    maxHeight: '50%',
  },
}));

const HomePageView = () => {
  const classes = useStyles();
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <br />
      <br />
      <img className={classes.image} 
      alt="City College" 
      src="https://www.ccny.cuny.edu/sites/default/files/styles/section_background_image_1440x900/public/2019-08/carlosparker_harrishall.jpg"
      />
    </div>
  );    
}

export default HomePageView;