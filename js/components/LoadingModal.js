import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Modal, Platform} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {Colors} from '../common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

function LoadingModal({}) {
  const {isShowLoadingView} = useSelector(s => s.appState);
  const isIOS = Platform.OS == 'ios';
  const loadingComponent = (
    <View style={styles.modalcontainer}>
      <SkypeIndicator size={wp(15)} color={Colors.mainThemeColor} />
    </View>
  );
  if (isIOS) {
    return isShowLoadingView ? loadingComponent : null;
  } else {
    return isShowLoadingView ? (
      <Modal transparent={true} visible={isShowLoadingView}>
        {loadingComponent}
      </Modal>
    ) : null;
  }
}
const styles = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

module.exports = LoadingModal;
