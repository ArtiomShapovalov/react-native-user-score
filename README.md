# react-native-user-score

A flexible, lightweight user score component. The component responds to drags and not just clicks, icon boundaries are computed automatically.

<img src="https://i.imgur.com/YtC6xgS.gif" />

## Installation

```sh
npm i -S react-native-score-rating
```

or

```sh
yarn add react-native-score-rating
```

## Usage

```js
import React, { Component } from 'react';

import { View, ScrollView, Text } from 'react-native';

import ScoreView from 'react-native-score-rating';

export class Demo extends Component<*,*> {
  state = {
    value: 2,
    scrollEnabled: true,
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          <ScoreView
            value={this.state.value}
            maximum={5}
            onChangeValue={value =>
              this.setState({ scrollEnabled: false, value })
            }
            onChangeFinish={() => this.setState({ scrollEnabled: true })}
            renderItem={active => (
              <Text color={active ? Colors.yellow20 : Colors.dark20} icon>
                {Icons.star}
              </Text>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
```

Note: Text is a custom component to demonstrate coloring. You have absolute control in the icon rendered -- styling included.

## Props

| Name           |                            Description                             |                                Default |
| :------------- | :----------------------------------------------------------------: | -------------------------------------: |
| value         |                           Current score                            |                                      0 |
| maximum        |                    Maximum score                     |                                      5 |
| spacing        |                  Spacing between each component\*                  |                                     10 |
| onChangeValue  |      Func:bool=>JSX to render a single score component      | Not supplied - requires implementation |
| onChangeFinish | Func:() => void for triggering event after score is finaly changed | Not supplied - requires implementation |

\* Spacing is applied as a right margin of all inner scores.

## License

The MIT License.
