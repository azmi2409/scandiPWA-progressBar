import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import './CheckoutProgressBar.style.scss';

export default class CheckoutProgressBar extends PureComponent {
  static propTypes = {
    stepMap: PropTypes.array.isRequired,
    currentStep: PropTypes.string.isRequired,
  };

  static defaultProps = {
    stepMap: [],
    currentStep: "",
  };

  getMaxStep() {
    return this.props.stepMap.length;
  }

  getCurrentStep() {
    const { stepMap } = this.props;
    const { checkoutStep } = this.props;
    const currentStep = stepMap.find(
      (step) => step.title === this.props.checkoutStep
    );
    return currentStep.index;
  }

  getStepPercentage() {
    const maxStep = this.getMaxStep();
    const currentStep = this.getCurrentStep();
    return (currentStep / maxStep) * 100;
  }

  renderSteps() {
    const Steps = this.props.stepMap.map((step) => {
      const { index, stepName } = step;
      const active = this.getCurrentStep() >= index ? "active" : "";
      if (stepName !== "") {
        return (
          <>
            <div key={index} className="Checkout-Test-Item-Outer">
              <div
                className={
                  active
                    ? "Checkout-Test-Item-Inner active"
                    : "Checkout-Test-Item-Inner"
                }
              >
                {index}
              </div>
            </div>
          </>
        );
      }
    });
    return Steps;
  }

  renderTitle() {
    const { stepMap } = this.props;
    const { checkoutStep } = this.props;
    const Title = stepMap.map((step) => {
      const { index, stepName } = step;
      const active = this.getCurrentStep() >= index ? "active" : "";
      if (stepName !== "") {
        return (
          <div key={index} className="test">
            <div
              className={
                active
                  ? "Checkout-Test-Item-Title active-title"
                  : "Checkout-Test-Item-Title"
              }
            >
              {stepName}
            </div>
          </div>
        );
      }
    });
    return Title;
  }

  render() {
    return (
      <div className="Checkout-Test">
        <progress
          className="Checkout-Test-Progress"
          value={this.getStepPercentage()}
          max="100"
        />
        <div className={`Checkout-Test-Item`}>{this.renderSteps()}</div>
        <div className="Checkout-Test-Render">{this.renderTitle()}</div>
      </div>
    );
  }
}
