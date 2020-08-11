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
                <Line ref={(reference) => this.lineReference = reference}
                      data={this.state.data}
                      options={this.state.options}/>
            </div>

        );
    }

    componentDidMount() {
        let that = this;
        this.timerID = setInterval(
            () => {
                fetch("/telemetry").then(r => r.json()).then(function (data) {
                    const currentLabels = that.state.data.labels;
                    const currentData = that.state.data.datasets[0].data;
                    if (data.is_race_on && that.lineReference) {
                        currentLabels.push(data.timestamp_ms);
                        currentData.push(data[that.props.telemetry]);
                        that.lineReference.chartInstance.update()
                    }
                });
            },
            200
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}

export default LineChart