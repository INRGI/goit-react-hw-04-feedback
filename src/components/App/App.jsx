import FeedbackOptions from "components/FeedbackOptions";
import Notification from "components/Notification";
import Section from "components/Section";
import Statictics from "components/Statictics";
import { Component } from "react";
import { Container } from "./App.styled";

export class App extends Component{
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  };
  onLeaveFeedback = state => {
    this.setState(prevState =>({[state]:prevState[state] + 1}))
  }

  totalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  positivePercentage = () => {
    const { good } = this.state;
    const total = this.totalFeedback();
    return Math.round((good / total) * 100) || 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.totalFeedback();
    const percentage = this.positivePercentage();
    const options = Object.keys(this.state);

    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={this.onLeaveFeedback} />
        </Section>
        <Section title="Statictics">
          {total !== 0 ? (
            <Statictics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={percentage} />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </Container>
    );
  }
};