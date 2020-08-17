import React from "react";
import io from 'socket.io-client';

class DataManager extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.socket.close();
        console.log("Data Requester unmounted");
    }

    componentDidMount() {
        var telemetryEndpoint = "http://localhost:5000";
        this.socket = io.connect(telemetryEndpoint, {
            reconnection: true,
        });

        this.socket.emit("request data streaming");

        function pushData(data, key) {
            this.props.data[key].push(data[key]);
        }

        function setDataValue(data, key) {
            this.props.data[key] = data[key];
        }

        this.socket.on("telemetry response", data => {
            if (data.is_race_on) {
                pushData.call(this, data, "timestamp_ms");
                pushData.call(this, data, "norm_suspension_travel_FL");
                pushData.call(this, data, "norm_suspension_travel_FR");
                pushData.call(this, data, "norm_suspension_travel_RL");
                pushData.call(this, data, "norm_suspension_travel_RR");
                setDataValue.call(this, data, "tire_temp_FL");
                setDataValue.call(this, data, "tire_temp_FR");
                setDataValue.call(this, data, "tire_temp_RL");
                setDataValue.call(this, data, "tire_temp_RR");
                setDataValue.call(this, data, "engine_max_rpm");
                setDataValue.call(this, data, "current_engine_rpm");
                setDataValue.call(this, data, "cur_lap_time");
                setDataValue.call(this, data, "best_lap_time");
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div/>
            </React.Fragment>
        )
    }
}

export default DataManager;