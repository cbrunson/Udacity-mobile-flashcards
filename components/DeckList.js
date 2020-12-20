import React from 'react'
import { connect } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

class DeckList extends React.Component {
  render() {
    const { decks } = this.props;
    const deckData = Object.keys(decks).map(id => decks[id]);

    if (deckData.length <= 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
          <Text style={{textAlign: 'center', fontSize: 20}}>No decks available! Try creating one with Add Deck.</Text>
        </View>
      );
    }
    return (
      <FlatList
        style={{ flex: 1}}
        data={deckData}
        renderItem={({ item }) => {
          return (
            <View style={{ justifyContent: 'center', padding: 40, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {deck: item})}>
                <View>
                  <Text style={{textAlign: 'center', fontSize: 18, color: 'black', paddingVertical: 10, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{textAlign: 'center', fontSize: 16, color: 'darkgray' }}>{Object.keys(item.flashcards || {}).length} cards</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

function mapStateToProp(state) {
  return state;
}

export default connect(mapStateToProp)(DeckList)
