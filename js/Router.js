import React, {useEffect} from 'react';
import {MockScreen , Home} from './screen';
import {StyleSheet, View, LogBox, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const MainStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MockScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Entypo name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DebitCard"
        component={MainStack}
        options={{
          tabBarLabel: 'Debit Card',
          tabBarIcon: ({color}) => (
            <AntDesign name="creditcard" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={MockScreen}
        options={{
          tabBarLabel: 'Payments',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="contactless-payment-circle-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Credit"
        component={MockScreen}
        options={{
          tabBarLabel: 'Credit',
          tabBarIcon: ({color}) => (
            <FontAwesome name="arrow-circle-up" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MockScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <FontAwesome name="user" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Router = ({}) => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <RootTabs />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
