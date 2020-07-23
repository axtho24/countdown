import React, { Component } from "react";
import "../App.css";
import TimerSpeedControl from "./TimerSpeedControls";
import CountDownControls from "./TimerControls"
import FlipClock from "./ClockStyle"
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    value: '',
    speed: 1
  };
  handleChange = this.handleChange.bind(this)

//   HANDLE CHANGE ON INPUT AND PREVENT VALUE ENTRIES OTHER THAN NUMBERS
  handleChange(e) {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({
           value: e.target.value,
           timerTime: e.target.value * 60000
        })
    }
  }

//START COUNTDOWN TAKING SPEED SELECTED AS ARGUMENT
//DEFAULT SPEED WILL ALWAYS BE 1
  countDownStart = (timerS) => {
    clearInterval(this.timer);
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
      speed: timerS
    });

    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - (10 * this.state.speed);
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
      }

      //ADD STYLE EFFECTS TO COUNTDOWN WARNINGS
      if (newTime <= 20000 && newTime > 1000) {
        document.getElementsByClassName('countdownAlert')[0].style.color = 'red';
      }

      if (newTime <= 10000 && newTime > 1000) {
        document.getElementsByClassName('countdownAlert')[0].classList.add('blink');
      } 

      // ADD AND REMOVE FOCUS CLASS TO SPEED BUTTONS
      // CLASS BETTER THAN SETTING FOCUS CAUSE OF POSSIBLE CSS LOSS WHEN CLICKING OUTSIDE BUTTON 
      if (timerS === 1) {
        document.getElementById('speedOne').classList.add('focusSpeed');
        document.getElementById('speedOneHalf').classList.remove('focusSpeed');
        document.getElementById('speedTwo').classList.remove('focusSpeed');
      } else if (timerS === 1.5) {
        document.getElementById('speedOne').classList.remove('focusSpeed');
        document.getElementById('speedOneHalf').classList.add('focusSpeed');
        document.getElementById('speedTwo').classList.remove('focusSpeed');
      } else if (timerS === 2) {
        document.getElementById('speedOne').classList.remove('focusSpeed');
        document.getElementById('speedOneHalf').classList.remove('focusSpeed');
        document.getElementById('speedTwo').classList.add('focusSpeed');
      }

    }, 10);
  };

  //STOP COUNTDOWN TIMER
  countDownStop = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  //RESET COUNTDOWN TIMER TO REFLECT VALUE ON INPUT
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        speed: 1,
        timerTime: this.state.value * 60000
      });
    }
  };

  render() {
    const { timerTime, timerStart, timerOn, value, speed } = this.state;
    
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = (Math.floor((timerTime / 60000)));

    return (
        <Container maxWidth="sm">
            <h1 className="Countdown-header">COUNTDOWN TIMER</h1>
                <Grid container spacing={0} justify="center" alignItems="center" className="timerInput">
                    <Grid item xs={12} sm={6}>
                     <TextField id="outlined-number" label="Countdown Time" variant="outlined" value={this.state.value} onChange={this.handleChange}/>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Button disabled={!value} onClick={() => this.countDownStart(1)} variant="contained" color="secondary" size="large">
                            Start
                        </Button> 
                    </Grid>
                </Grid>

                

            <div className="Countdown-time">
                {timerTime <= ((value * 60000)/2) && timerTime > 1000 && (
                    <h3 className="countdownAlert">MORE THAN HALFWAY THERE!</h3>
                )}

                {timerStart !== 0 && timerTime <= 1000 && (
                    <h3 className="timesUp">TIME'S UP!</h3>
                )}

                <div className="clockSim">
                    
                <FlipClock countMinutes={minutes} countSeconds={seconds}/>

                <CountDownControls 
                    timerStop={this.countDownStop} 
                    timerStart={this.countDownStart}
                    timerReset={this.resetTimer} 
                    timerisOn={timerOn} 
                    timerT={timerTime} 
                    timerS={timerStart} 
                    speedSet={speed}        
                    />
                
                <TimerSpeedControl timerIsOn={timerOn} speedControl={this.countDownStart}/>

                </div>
            </div>

        </Container>
    );
  }
}

export default Countdown;