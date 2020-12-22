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
          },
        isFormValid: false
    }

    grabDeckTitle = (input) => {
        let deck = {...this.state.deck}
        deck.title = input
        this.setState(() => ({ deck }))
        
        if (input) {
            //enable <TouchableOpacity> submit button
            this.setState(() => ({ isFormValid: true }));
        } else {
            //disable <TouchableOpacity> submit button
            this.setState(() => ({ isFormValid: false }));
        }
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
        if (this.state.isFormValid) {
            const newDeck = {...this.state.deck};

            this.props.dispatch(handleAddDeck(newDeck.title, newDeck.id));
            let resetDeck = {...this.state.deck}
        
            this.props.navigation.goBack();
        
            setTimeout(() => {
                this.props.navigation.navigate(
                'Deck',
                {deck: resetDeck });
            }, 200);
            
            this.resetDeckState();

        } else {

            alert("Please provide a name for the new deck.");

        }
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
                  <TouchableOpacity id="submitButton" onPress={this.addDeck} active={!this.state.isFormValid} disabled={!this.state.isFormValid}>
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