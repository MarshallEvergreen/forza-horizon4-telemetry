import React from "react";
import {Line} from 'react-chartjs-2';

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
        let linechart = this.chartRef.chartInstance;
        let that = this;
        this.timerID = setInterval(
            () => {
                if (linechart) {
                    that.state.data.labels = this.props.data["timestamp_ms"];
                    that.state.data.datasets[0].data = this.props.data[this.props.telemetry];
                    linechart.update()
                }
            },
            1000
        );
    }

    componentWillUnmount() {
        console.log("Unmounting", this.props.telemetry);
        clearInterval(this.timerID);
    }
}

export default LineChart