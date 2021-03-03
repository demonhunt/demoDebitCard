import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import globalSetting from './setting'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class CheckBox1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.checked ? this.props.checked : false,
    }
    this.onClick = this.onClick.bind(this)
    this.setChecked = this.setChecked.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked && nextProps.checked != this.props.checked) {
      this.setState({
        checked: nextProps.checked ? nextProps.checked : false,
      })
    }
  }
  onClick() {
    this.props.onIsChecked ? this.props.onIsChecked() : {}
    this.setState({ checked: !this.state.checked })
  }
  setChecked(isChecked) {
    this.setState({ checked: isChecked })
  }

  isChecked() {
    if (this.state.checked) {
      return true
    }
    return false
  }

  render() {
    var iconCheck = null
    if (this.state.checked) {
      // iconCheck=(<Text style={{fontSize:15, color: globalSetting.main_text_color}}>&#x2713;</Text>)
      iconCheck = (
        <View
          style={{
            backgroundColor: 'transparent',
            height: 22,
            width: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialCommunityIcons
            name={'check'}
            size={18}
            color={globalSetting.blue_color}
          />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }} onPress={this.onClick}>
        <TouchableOpacity
          onPress={this.onClick}
          disabled={this.props.disabled ? true : false}
        >
          <View
            style={{
              ...this.props.styles,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: this.props.disabled ? 0.3 : 1,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={[
                this.props.style,
                { fontSize: 20, color: globalSetting.main_text_color },
              ]}
            >
              {this.props.label}
            </Text>
            <View
              style={{
                height: 22,
                width: 22,
                borderWidth: 1,
                borderColor: globalSetting.blue_color,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {iconCheck}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
