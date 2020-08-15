import React from "react";
import io from 'socket.io-client';

class Dashboard extends React.Component {

    RequestTelemetry() {
        this.socket.emit("request telemetry", {});
    }

    componentWillUnmount() {
        this.socket.close();
        clearInterval(this.timerID);
        console.log("Data Requester unmounted");
    }

    componentDidMount() {
        var telemetryEndpoint = "http://localhost:5000";
        this.socket = io.connect(telemetryEndpoint, {
            reconnection: true,
        });
        this.timerID = setInterval(
            () => this.RequestTelemetry(),
            100
        );
    }

    render() {
        return (
            <React.Fragment>
                <div/>
            </React.Fragment>
        )
    }
}

export default Dashboard;