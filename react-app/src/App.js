import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Spring from '@material-ui/icons/ViewHeadline';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Grid from "@material-ui/core/Grid";
import LineChart from "./lineChart";
import RPM from "./rpm";
import TyreTemperature from "./tyreTempChart";
import DataManager from "./dataManager";
import BestLapCurrentLap from "./bestLapCurrentLap";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: '100%'
    },
    tabPanel: {
        flexGrow: 1,
        width: '100%'
    },
    gridContainer: {
        height: '100%'
    }
}));

let currentData = {
    "timestamp_ms": [],
    "norm_suspension_travel_FL": [],
    "norm_suspension_travel_FR": [],
    "norm_suspension_travel_RL": [],
    "norm_suspension_travel_RR": [],
    "current_engine_rpm": 0,
    "engine_max_rpm": 0,
    "best_lap_time": 0,
    "cur_lap_time": 0,
    "tire_temp_FL": [],
    "tire_temp_FR": [],
    "tire_temp_RL": [],
    "tire_temp_RR": []
};

export default function App(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <DataManager data={currentData}/>
            <Tabs
                orientation="vertical"
                value={value}
                variant="scrollable"
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Suspension Travel" icon={<Spring/>} {...a11yProps(0)} />
                <Tab label="Engine" icon={<DriveEtaIcon/>}{...a11yProps(1)} />
            </Tabs>
            <TabPanel className={classes.tabPanel} value={value} index={0}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <LineChart data={currentData} telemetry="norm_suspension_travel_FL"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChart data={currentData} telemetry="norm_suspension_travel_FR"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChart data={currentData} telemetry="norm_suspension_travel_RL"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChart data={currentData} telemetry="norm_suspension_travel_RR"/>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={value} index={1}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <RPM data={currentData}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TyreTemperature data={currentData}/>
                    </Grid>
                    <Grid item xs={6}>
                        <BestLapCurrentLap data={currentData}/>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
            </TabPanel>
        </div>
    );
}