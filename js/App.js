'use strict';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
var configureStore = require('./store/configureStore');
import Router from './Router';
import {RootSiblingParent} from 'react-native-root-siblings';

const Root = ({}) => {
  return (
    <Provider store={configureStore(() => {})}>
      <RootSiblingParent>
        <Router />
      </RootSiblingParent>
    </Provider>
  );
};
module.exports = Root;
