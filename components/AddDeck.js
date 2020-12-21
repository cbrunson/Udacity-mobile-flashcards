import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'
import { NavigationActions } from 'react-navigation'
import { getRandomNumber } from '../utils/helpers'


class AddDeck extends React.Component {
    state = {
        deck : {
          id: 'Deck' + getRandomNumber(),
          title: '',
          cards : []
          }
    }

    grabDeckTitle = (input) => {
        let deck = {...this.state.deck}
        deck.title = input
        this.setState(() => ({ deck }))
    }

    resetDeckState = () => {
        setTimeout(() => {
          let resetDeck = {...this.state.deck}
          resetDeck.title = ''
          resetDeck.id = 'Deck' + getRandomNumber()
          this.setState(() => ({ deck: resetDeck }))
        },500)
    }

    addDeck = () => {

        const newDeck = {...this.state.deck};
        this.props.dispatch(handleAddDeck(newDeck.title, newDeck.id));
        let resetDeck = {...this.state.deck}

        this.props.navigation.goBack();

        setTimeout(() => {
            this.props.navigation.navigate(
            'Deck',
            {deck: resetDeck }
            );
        }, 200);
        this.resetDeckState();
        
    }

    render() {     
      return (
          <View style={{flex: 1, paddingHorizontal: 50}}>
              <View style={{flex: 1, paddingVertical: 10, justifyContent: 'center'}}>
                  <Text style={{textAlign: 'center', fontSize: 20, marginVertical: 10}}>Enter the title of the new deck:</Text>
                  <TextInput
                      style={{borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginTop: 10}} 
                      onChangeText={this.grabDeckTitle}
                      value={this.state.deck.title} />
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 100}}>
                  <TouchableOpacity onPress={this.addDeck}>
                      <View style={{ marginVertical: 10, backgroundColor: 'blue', borderRadius: 5, padding: 10}}>
                          <Text style={{color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>Add Deck</Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </View>
      )
    }
}

export default connect()(AddDeck)