import React, {Component} from "react";
import "../App.css";

const AnimatedCard = ({ animation, digit }) => {
    return(
      <div className={`flipCard ${animation}`}>
        <span>{digit}</span>
      </div>
    );
  };
  
const StaticCard = ({ position, digit }) => {
  return(
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};
  
const FlipUnitContainer = ({ digit, shuffle, unit }) => {	
  // ASSIGN VALUES
  // PREVIOUS DIGIT ADDITION SINCE THIS IS A COUNTDOWN
  let currentDigit = digit;
  let previousDigit = parseInt(digit) + 1;

  // ADD ZERO ONLY TO MINUTES ON CLOCK
  if ( currentDigit < 10 && unit === 'minutes' ) {
    currentDigit = `0${currentDigit}`;
  } 
  if ( previousDigit < 10 ) {
    previousDigit = `0${previousDigit}`;
  }

  // SHUFFLE DIGITS
  const digit1 = shuffle 
    ? previousDigit 
    : currentDigit;
  const digit2 = !shuffle 
    ? previousDigit 
    : currentDigit;

  // SHUFFLE ANIMATION
  const animation1 = shuffle 
    ? 'fold' 
    : 'unfold';
  const animation2 = !shuffle 
    ? 'fold' 
    : 'unfold';

  return(
    <div className={'flipUnitContainer'}>
      <StaticCard position={'upperCard'} digit={currentDigit} />
      <StaticCard position={'lowerCard'} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};
  
class FlipClock extends Component {
  constructor() {
      super();
        this.state = {
            minutes: 0,
            minutesShuffle: true,
            seconds: 0,
            secondsShuffle: true
        };
    }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(),50);
  }

  updateTime() {
    const minutes = this.props.countMinutes;
    const seconds = this.props.countSeconds;
    // UPDATE MINUTE AND SHUFFLE STATE
    if( minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        minutes,
        minutesShuffle
      });
    }

    // UPDATE SECONDS AND SHUFFLE STATE
    if( seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle;
      this.setState({
        seconds,
        secondsShuffle
      });
    }
  }
  
    render() {
      const { 
          minutes, 
          seconds, 
          minutesShuffle, 
          secondsShuffle 
      } = this.state;
          
      return(
          <div className={'flipClock'}>
            <FlipUnitContainer unit={'minutes'} digit={minutes} shuffle={minutesShuffle} /> 
            <span className="timeColumn">:</span>
            <FlipUnitContainer unit={'seconds'} digit={seconds} shuffle={secondsShuffle} />
          </div>
      );
    }
}

  export default FlipClock;
