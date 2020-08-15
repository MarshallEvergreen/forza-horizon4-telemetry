import React from "react";
import {Doughnut} from "react-chartjs-2";
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import io from "socket.io-client";

class RPM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                datasets: [{
                    data: [],
                    backgroundColor: [red[500], green[500]]
                }
                ],
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'UsedRpm',
                    'RemainingRpm'
                ]
            },
            options: {
                animation: {
                    duration: 0.2
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
            }
        }
    };

    render() {
        return (
            <div>
                <h6>RPM</h6>
                <Doughnut ref={(reference) => this.chartRef = reference}
                          data={this.state.data}
                          options={this.state.options}/>
            </div>

        );
    }

    componentDidMount() {
        console.log("Mounting rpm graph");
        var telemetryEndpoint = "http://localhost:5000";
        this.socket = io.connect(telemetryEndpoint);
        this.socket.on("telemetry response", data => {
            if (data.is_race_on && this.chartRef) {
                if (data.is_race_on && this.chartRef) {
                    this.state.data.datasets[0].data = [data["current_engine_rpm"], data["engine_max_rpm"] - data["current_engine_rpm"]];
                    this.chartRef.chartInstance.update()
                }
            }
        });
    }

    componentWillUnmount() {
        this.socket.close();
        console.log("unmounting rpm graph");
    }
}

export default RPM