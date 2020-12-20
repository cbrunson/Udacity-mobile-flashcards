import React from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { handleAddFlashcard } from '../actions/decks'

class AddCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }
    addCard = () => {
        let { question, answer } = this.state;
        const { deck } = this.props.navigation.state.params;

        question = question.trim();
        answer = answer.trim()
        if (!question || !answer) {
            alert('You must provide a question and an answer.');
            return;
        }
        this.props.dispatch(handleAddFlashcard(deck.id, question, answer));
        this.props.navigation.goBack();
    }


    render() {
        const { deck } = this.props.navigation.state.params;
        
        return (
            <View style={{flex: 1, paddingHorizontal: 50}}>
                <View style={{paddingVertical: 10}}>
                    <TextInput 
                        style={{borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginTop: 10}} 
                        placeholder="Question" 
                        onChangeText={text => this.setState({question: text})} />
                    <TextInput 
                        style={{borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginTop: 10}} 
                        placeholder="Answer" 
                        onChangeText={text => this.setState({answer: text})} />
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 100}}>
                    <TouchableOpacity onPress={this.addCard}>
                        <View style={{ marginVertical: 10, backgroundColor: 'blue', borderRadius: 5, padding: 10}}>
                            <Text style={{color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>Add to Deck</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect()(AddCard)