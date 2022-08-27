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
          <Typography>{children}</Typography>
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
        <TabFinancials
          items={[
            {
              item: {
                value: `$${0}`,
                title: 'Total Investment Value',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Underlying asset price',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Closing costs',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Upfront LLC Fees',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Initial maintenance reserve',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Binaryx AI listing fee',
              },
            },
          ]}
        />
        <TabFinancials
          items={[
            {
              item: {
                value: `${0}%`,
                title: 'Total returns (IRR)',
              },
            },
            {
              item: {
                value: `${0}%`,
                title: 'Projected Appreciation',
              },
            },
            {
              item: {
                value: `${0}%`,
                title: 'Cash on Cash return',
              },
            },
            {
              item: {
                value: `${0}%`,
                title: 'Cap Rate',
              },
            },
          ]}
        />
        <TabFinancials
          items={[
            {
              item: {
                value: `$${0}`,
                title: 'Annual gross rents',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Property taxes',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Homeowners insurance',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Property management',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Utilities',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Annual LLC administration and filing fees',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Annual cash flow',
              },
            },
            {
              item: {
                value: `$${0}`,
                title: 'Monthly cash flow',
              },
            },
          ]}
        />
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
