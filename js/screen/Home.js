import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CommonStyles} from '../common';
import {getDebitCardInfo} from '../actions'

function Home(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDebitCardInfo());
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, ...CommonStyles.allCenter},
});

module.exports = Home;
