import React, { Component } from "react";
import "../App.css";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';


class CountDownControls extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={3} sm={3}>
                {this.props.timerisOn === true && this.props.timerT >= 1000 && (
                    <Fab size="small" color="secondary" onClick={this.props.timerStop}>
                        <PauseRoundedIcon  />
                    </Fab>
                )}
            </Grid>

            <Grid item xs={3} sm={3}>
                {this.props.timerisOn === false &&
                (this.props.timerS !== 0 && this.props.timerS !== this.props.timerT && this.props.timerT !== 0) && (
                    <Fab size="small" color="primary" onClick={() => this.props.timerStart(this.props.speedSet)}>
                        <PlayArrowRoundedIcon  />
                    </Fab>
                )}
            </Grid>

            <Grid item xs={3} sm={3}>
                {(this.props.timerisOn === false || this.props.timerT < 1000) &&
                (this.props.timerS !== this.props.timerT && this.props.timerS > 0) && (
                    <Fab size="small" color="primary" onClick={this.props.timerReset}>
                        <CachedRoundedIcon />
                    </Fab>
                )} 
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default CountDownControls;