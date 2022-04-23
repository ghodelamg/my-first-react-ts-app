import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';

import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice'

import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;
  const navigate = useNavigate();

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <nav>
      <section>
         <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
      }}
    >
        
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
         indicatorColor="secondary"
          textColor="inherit"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab label={"Notification ("+ numUnreadNotifications +")"} value="/notifications" />
        <Tab label="MUI Table" value="/rtable"></Tab>
        <Tab label="Posts" value="/posts"></Tab>
        <Tab label="Users" value="/users"></Tab>
        <Tab label="App" value="/" />
        <Tab label="Form" value="/form"></Tab>
        <Tab label="Numbers" value="/numbers"></Tab>
        <Tab label="Conditional Rendering" value="/conditional-rendering"></Tab>
        <Tab label="Handling Events" value="/handling-events"></Tab>
        <Tab label="Lifting State Up" value="/lifting-state-up"></Tab>
        <Tab label="Context" value="/context-ex-1"></Tab>
        <Tab label="Forwarding Ref" value="/forwarding-ref"></Tab>
        <Tab label="HOC Components" value="/hoc-components"></Tab>
        <Tab label="Portals" value="/portals"></Tab>
        <Tab label="Refs" value="/refs"></Tab>
        <Tab label="RenderingProps" value="/rendering-props"></Tab>
        <Tab label="Use Effect Ex1" value="/use-effect-ex1"></Tab>
        <Tab label={"Composition/Inheritance - ContainMent Ex-1 (Pass all native elements)"} value="/containment-ex-1" />
        <Tab label={"Composition/Inheritance - ContainMent Ex-2 (Custom Component As Props)"} value="/containment-ex-2" />
      </Tabs>
      <Button sx={{ marginLeft:'10px' }} variant="contained" onClick={fetchNewNotifications}>Refresh Notifications</Button>
    </Box>

        <div className="navContent">
          <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem"
            }}
            >
            </nav>
        </div>
      </section>
    </nav>
  )
}
