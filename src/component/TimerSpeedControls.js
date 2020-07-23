import React, { Component } from "react";
import "../App.css";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class timerSpeedControl extends Component {
  render() {
    return (
      <div className="timerControl">
        <Grid container spacing={3} justify="center">
            <Grid item xs={3} sm={3}>
                <Button id="speedOne" disabled={!this.props.timerIsOn} variant="contained" color="primary" onClick={() =>  this.props.speedControl(1)}>
                    1X
                </Button>
            </Grid>

            <Grid item xs={3} sm={3}>
                <Button id="speedOneHalf" disabled={!this.props.timerIsOn} variant="contained" color="primary" onClick={() => this.props.speedControl(1.5)}>
                    1.5X
                </Button>
            </Grid>

            <Grid item xs={3} sm={3}>
                <Button id="speedTwo" disabled={!this.props.timerIsOn} variant="contained" color="primary" onClick={() => this.props.speedControl(2)}>
                    2X
                </Button>
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default timerSpeedControl;