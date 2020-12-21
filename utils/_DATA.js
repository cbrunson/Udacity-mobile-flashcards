import { AsyncStorage } from 'react-native';

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const storageKey = '@mobile-flashcards:data'

function formatCard(question, answer) {
  return {
    id: generateUID(),
    question: question,
    answer: answer,
  }
}

function formatDeck(title, newId) {
  
  let outId = '';
  
  newId ? outId = newId: outId = generateUID();
  
  return {
    id: outId,
    title: title,
    flashcards: {}
  }
}

async function getDecksFromStorage() {
  const decks = await AsyncStorage.getItem(storageKey);
  if (!decks) {
    return {};
  }
  return JSON.parse(decks);
}

export async function _getDecks() {
  const decks = await getDecksFromStorage();
  if (Object.keys(decks).length === 0) {
    return {}
  }
  return decks;
}

async function _saveDecks(decks) {
  await AsyncStorage.setItem(storageKey, JSON.stringify(decks));
}

export async function _addDeck(title, newId) {
  const formattedDeck = formatDeck(title, newId)
  const decks = await getDecksFromStorage();
  decks[formattedDeck.id] = formattedDeck;
  await _saveDecks(decks);
  return formattedDeck;
}

export async function _deleteDeck(deckId) {
  const decks = await getDecksFromStorage();
  delete decks[deckId];
  await _saveDecks(decks);
}


export async function _addFlashcard(deckId, question, answer) {
    const formattedCard = formatCard(question, answer);
    const decks = await getDecksFromStorage();
    decks[deckId].flashcards[formattedCard.id] = formattedCard;
    await _saveDecks(decks);
    return formattedCard;
}

