import React from "react";
import {Doughnut} from "react-chartjs-2";
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

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
        let rpmChart = this.chartRef.chartInstance;
        let that = this;
        this.timerID = setInterval(
            () => {
                if (rpmChart) {
                    that.state.data.datasets[0].data = [this.props.data["current_engine_rpm"], this.props.data["engine_max_rpm"] - this.props.data["current_engine_rpm"]];
                    rpmChart.update()
                }
            },
            100
        );
    }

    componentWillUnmount() {
        console.log("unmounting rpm graph");
        clearInterval(this.timerID);
    }
}

export default RPM