// @flow

import React, { Component } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';

type PropsType = {
  maximum?: number,
  rating?: number,
  spacing?: number,
  onChangeValue: (index: number) => any,
  onChangeFinish?: () => void,
  renderItem: any => any,
  containerStyle?: Object,
};

export default class ScoreRating extends Component<PropsType, *> {
  static defaultProps = {
    maximum: 5,
    rating: 0,
    spacing: 10,
    onChangeValue: (index: number) => {},
  };

  score = null;

  constructor(props: PropsType) {
    super(props);

    this.state = { ...this.props };
  }

  _onShouldSetResponder = () => true;

  onLayout = (layout: Object) =>
    this.score &&
    this.score.measure((x, y, width, height, pageX, pageY) => {
      this.setState({ scoreX: pageX, scoreWidth: width });
    });

  _onChangeFinish = () =>
    this.props.onChangeFinish && this.props.onChangeFinish();

  _updateChangeValue = (evt: Object) => {
    const x = evt.nativeEvent.pageX - this.state.scoreX;
    const propotion = x / this.state.scoreWidth;

    let rating = Math.ceil(+this.props.maximum * propotion);

    if (rating < 0) rating = 0;
    else if (rating > this.state.maximum) rating = this.state.maximum;

    this.setState({ rating });

    this.props.onChangeValue(rating);
  };

  render() {
    let icons = [];

    for (let i = 0; i < this.state.maximum; i++) {
      let styles = { ...this.props.containerStyle };

      if (i < this.state.maximum - 1) {
        styles.marginRight = this.props.spacing;
      }

      icons.push(
        <View key={i} style={styles}>
          {this.props.renderItem(i < this.state.rating)}
        </View>,
      );
    }

    return (
      <View
        ref={score => (this.score = score)}
        style={styles.container}
        onLayout={this.onLayout}
        onStartShouldSetResponder={this._onShouldSetResponder}
        onMoveShouldSetResponder={this._onShouldSetResponder}
        onResponderRelease={this._onChangeFinish}
        onResponderGrant={this._updateChangeValue}
        onResponderMove={this._updateChangeValue}
      >
        {icons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
