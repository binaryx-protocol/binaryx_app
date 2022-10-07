import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabDetails from './TabDetails';
import TabFinancials from './TabFinancials';
import TabDocuments from './TabDocuments';
import TabBuyingProcess from './TabBuyingProcess';
import TabMarket from './TabMarket';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Details" id="details" aria-controls="details" />
          <Tab label="Financials" id="financials" aria-controls="financials" />
          <Tab label="Documents" id="documents" aria-controls="documents" />
          <Tab
            label="Buying Process"
            id="buying process"
            aria-controls="buying process"
          />
          <Tab label="Market" id="market" aria-controls="market" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabFinancials />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabDocuments />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabBuyingProcess />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TabMarket />
      </TabPanel>
    </Box>
  );
}
