import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import styles from './Layout.module.css';
//import R1 from './routing1';
import R1 from '../admin/adminHospiter';
import R2 from './routing2';
import R3 from './routing3';
import R4 from './routing4';
import aplogo from '../data/aplogo.png';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' ,display: 'flex'}}>
        <img src={aplogo} alt="로고"/>
        <Tabs sx={{ width: '750px' }} value={value} onChange={handleChange} aria-label="basic tabs example ">
          <Tab label="진료 희망자" {...a11yProps(0)} />
          <Tab label="진료 신청" {...a11yProps(1)} />
          <Tab label="조치 내역" {...a11yProps(2)} />
          <Tab label="추적 관리" {...a11yProps(3)} />
        </Tabs>
        <div className={styles.wfill} />
        <Link to="/">로그아웃</Link>
      </Box>
      <TabPanel key={0} value={value} index={0}>
        <R1 />
      </TabPanel>
      <TabPanel key={1} value={value} index={1}>
        <R2 />
      </TabPanel>
      <TabPanel key={2} value={value} index={2}>
        <R3 />
      </TabPanel>
      <TabPanel key={3} value={value} index={3}>
        <R4 />
      </TabPanel>
    </Box>
  );
}