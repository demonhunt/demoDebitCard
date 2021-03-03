import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CommonStyles} from '../common';

function MockScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MockScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, ...CommonStyles.allCenter},
  text: {fontWeight: 'bold', fontSize: 20},
});

module.exports = MockScreen;
