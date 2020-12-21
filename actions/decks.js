import {_addDeck, _addFlashcard, _getDecks, _deleteDeck} from '../utils/_DATA'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const DELETE_DECK = 'DELETE_DECK'
export const RECEIVE_FLASHCARDS = 'RECEIVE_FLASHCARDS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_FLASHCARD = 'ADD_FLASHCARD'


function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function handleReceiveDecks() {
    return (dispatch) => {
        _getDecks().then(decks => {
            dispatch(receiveDecks(decks))
        });
    };
}

export function addDeck(deck, newId) {
    return {
        type: ADD_DECK,
        id: newId,
        deck: deck
    }
}

export function handleAddDeck(title, newId) {
    return (dispatch) => {
        _addDeck(title, newId).then((deck) => dispatch(addDeck(deck, newId)))
    }
}

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function handleDeleteDeck(deckId) {
    return (dispatch) => {
        _deleteDeck(deckId).then(() => dispatch(deleteDeck(deckId)));
    }
}

export function addFlashcard(deckId, flashcard) {
    return {
        type: ADD_FLASHCARD,
        deckId: deckId,
        flashcard: flashcard
    }
}

export function handleAddFlashcard(deckId, question, answer) {
    return (dispatch) => {
        _addFlashcard(deckId, question, answer)
            .then((flashcard) => dispatch(addFlashcard(deckId, flashcard)))
    }
}