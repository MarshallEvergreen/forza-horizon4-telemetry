import React from "react";
import {Bar} from "react-chartjs-2";
import io from "socket.io-client";

class TyreTemperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                datasets: [{
                    data: [],
                }
                ],
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Front left',
                    'Front Right',
                    'Rear left',
                    'Rear Right'
                ]
            },
            options: {
                animation: {
                    duration: 0.2
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                            suggestedMax: 120    // minimum will be 0, unless there is a lower value.
                        }
                    }]
                }
            }
        }
    };

    render() {
        return (
            <div>
                <h6>Tyre Temperature</h6>
                <Bar ref={(reference) => this.chartRef = reference}
                     data={this.state.data}
                     options={this.state.options}/>
            </div>

        );
    }

    convert(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    componentDidMount() {
        var telemetryEndpoint = "http://localhost:5000";
        let that = this;
        this.socket = io.connect(telemetryEndpoint, {
            reconnection: true,
        });
        this.socket.on("telemetry response", data => {
            if (data.is_race_on && this.chartRef) {
                if (data.is_race_on && that.chartRef) {
                    that.state.data.datasets[0].data =
                        [
                            that.convert(data["tire_temp_FL"]),
                            that.convert(data["tire_temp_FR"]),
                            that.convert(data["tire_temp_RL"]),
                            that.convert(data["tire_temp_RR"])
                        ];
                    that.chartRef.chartInstance.update()
                }
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}

export default TyreTemperature