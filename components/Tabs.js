import React from 'react'
import { View, Text, Platform } from 'react-native'
import DeckList from '../components/DeckList'
import AddDeck from '../components/AddDeck'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Tabs = {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'View Decks',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='layers' size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="plus" size={30} color={tintColor} />
      },
    }
  }
  
  const navigationOptions = {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'rgba(1, 1, 10, 1)' : 'white',
      style: {
        padding: 10,
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? 'white' : 'rgba(145, 61, 136, 1)',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
  
  const TabNav = createBottomTabNavigator(Tabs, navigationOptions)

  export default TabNav