import React from "react";
import {Line} from 'react-chartjs-2';
import io from "socket.io-client";

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    borderColor: "#3e95cd",
                    fill: 'origin'
                }]
            },
            options: {
                legend: {
                    display: false
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                tooltips: {
                    enabled: false
                },
                animation: {
                    duration: 0.2
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                            suggestedMax: 1    // minimum will be 0, unless there is a lower value.
                        }
                    }]
                }
            }
        }
    };

    render() {
        return (
            <div>
                <h6>{this.props.telemetry}</h6>
                <Line ref={(reference) => this.chartRef = reference}
                      data={this.state.data}
                      options={this.state.options}/>
            </div>

        );
    }

    componentDidMount() {
        console.log("Mounting", this.props.telemetry);
        var telemetryEndpoint = "http://localhost:5000";
        let linechart = this.chartRef.chartInstance;
        this.socket = io.connect(telemetryEndpoint);
        this.socket.on("telemetry response", data => {
            if (data.is_race_on) {
                this.state.data.labels.push(data.timestamp_ms);
                this.state.data.datasets[0].data.push(data[this.props.telemetry]);
            }
        });
        this.timerID = setInterval(
            () => {
                if (linechart) {
                    linechart.update()

                }
            },
            1000
        );
    }

    componentWillUnmount() {
        console.log("Unmounting", this.props.telemetry);
        this.socket.close();
        clearInterval(this.timerID);

    }
}

export default LineChart