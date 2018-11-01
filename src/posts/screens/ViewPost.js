import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


class ViewPost extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    somePropToPass: PropTypes.string
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>ViewPost Screen</Text>
        <Text>{this.props.somePropToPass}</Text>
      </View>
    );
  }
}

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCDDDB',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  }
});
