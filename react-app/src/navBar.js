import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import teal from '@material-ui/core/colors/teal';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar style={{backgroundColor: teal[500]}} position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Telemetry
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar