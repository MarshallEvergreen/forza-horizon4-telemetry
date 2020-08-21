import React from "react";
import {Doughnut} from "react-chartjs-2";

class BestLapCurrentLap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLap: 0.0,
            bestLap: 0.0,
        }
    };

    render() {
        return (
            <div>
                <h1>Best Lap: {this.state.bestLap}</h1>
                <h1>Current Lap: {this.state.currentLap}</h1>
            </div>

        );
    }

    componentDidMount() {
        console.log("Mounting best lap current lap");
        let that = this;
        this.timerID = setInterval(
            () => {
                that.setState({currentLap: this.props.data["cur_lap_time"]});
                that.setState({bestLap: this.props.data["best_lap_time"]});
            },
            1000
        );
    }

    componentWillUnmount() {
        console.log("unmounting best lap current lap");
        clearInterval(this.timerID);
    }
}

export default BestLapCurrentLap