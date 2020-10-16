import React, {useState, useEffect} from "react";
import { AppBar, Toolbar, useScrollTrigger, Tabs, Tab, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  toolbarMargin:{
    ...theme.mixins.toolbar,
    marginBottom: "3em"
  },
  logo:{
    height: "7em"
  },
  tabContainer:{
    marginLeft:"auto"
  },
  tab:{
    ...theme.typography.tab,
    minWidth:10,
    marginLeft: "25px"
  },
  button:{
    ...theme.typography.estimate,
    borderRadius:"50px",
    marginLeft:"50px",
    marginRight:"25px",
    height:40,
    color:"white"
  },
  logoContainer:{
    padding:0,
    "&:hover":{
      backgroundColor:"transparent"
    }
  },
  menu:{
    backgroundColor: theme.palette.common.blue,
    color:"white",
    borderRadius: 0
  },
  menuItem:{
    ...theme.typography.tab,
    opacity:0.7,
    "&:hover":{
      opacity:1
    }
  }
}))

const menuOption = [
  {name:"Services", link:"/services"},
  {name:"Custom Software Development", link:"/customsoftware"},
  {name:"Mobile App Development", link:"/mobileapps"},
  {name:"Website Development", link:"/websites"}
]
  

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default function Header(props) {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }
  
  const handleClose = (event) => {
    setAnchorEl(null)
    setOpen(false)
  }
  

  const handleChange = (event, value) => {
    setTabValue(value)
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i)
  }
  

  useEffect(() => {
    switch(window.location.pathname){
      case "/":
        if(tabValue !==0){
          setTabValue(0)
        }
        break;
      case "/services":
        if(tabValue !==1){
          setTabValue(1)
        }
        break;
      case "/customsoftware":
        if(tabValue !==1){
          setTabValue(1);
          setSelectedIndex(1)
        }
        break;
      case "/mobileapps":
        if(tabValue !==1){
          setTabValue(1);
          setSelectedIndex(2)
        }
        break;
      case "/websites":
        if(tabValue !== 1){
          setTabValue(1);
          setSelectedIndex(3);
        }
        break;
      case "/revolution":
        if(tabValue !==2){
          setTabValue(2)
        }
        break;
      case "/about":
        if(tabValue !==3){
          setTabValue(3)
        }
        break;
      case "/contacts":
        if(tabValue !==4){
          setTabValue(4)
        }
        break;
      case "/estimate":
        if(tabValue !==5){
          setTabValue(5)
        }
        break;
      default:
        break;
    }
    return () => {
    }
  }, [tabValue])
  

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button component={Link} to="/" className={classes.logoContainer} onClick={()=>{setTabValue(0)}} disableRipple>
              <img alt="company logo" className={classes.logo} src={logo}/>
            </Button>
            <Tabs value={tabValue} onChange={handleChange} className={classes.tabContainer}>
              <Tab className={classes.tab} component={Link} to="/" label="Home"/>
              <Tab aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup={anchorEl ? "true" : undefined} className={classes.tab} onMouseOver={handleClick} component={Link} to="/services" label="Services"/>
              <Tab className={classes.tab} component={Link} to="/revolution" label="The Revolution"/>
              <Tab className={classes.tab} component={Link} to="/about" label="About Us"/>
              <Tab className={classes.tab} component={Link} to="/contact" label="Contact Us"/>
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>
            Free Estimate
          </Button>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={open} 
          onClose={handleClose}
          MenuListProps={{onMouseLeave: handleClose}}
          classes={{paper: classes.menu}}
          elevation={0}
          >
            {menuOption.map((option, i) => (
              <MenuItem key={option} component={Link} to={option.link}
              classes={{root:classes.menuItem}}
              onClick={(event)=>{handleMenuItemClick(event, i); setTabValue(1); handleClose();}}
              selected={i === selectedIndex && tabValue === 1}
              >
                {option.name}
              </MenuItem>
            ))}
          </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
