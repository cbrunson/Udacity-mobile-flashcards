import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { handleReceiveDecks } from './actions/decks'
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import Constants from "expo-constants";
import middleware from './middleware'
import TabNav from './components/Tabs'


function TopBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      headerShown: false
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.deck.title,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      title: 'Add Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: `Quiz: ${navigation.state.params.deck.title}`,
      headerBackTitle: '',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    })
  }
}, 
));

const store = createStore(reducer, middleware);

class App extends React.Component {
  storageKey = '@mobile-flashcard:state';

  componentDidMount() {
    store.dispatch(handleReceiveDecks());
  }

  render() {
    return (
    <Provider store={store}>
      <View style={{flex: 1}}>
          <TopBar backgroundColor={'lightgray'} />
          <MainNavigator />
        </View>
    </Provider>
    );
  }
}

export default App;