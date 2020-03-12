import { takeLatest, put, all, call, select } from "redux-saga/effects";

import {
  LOAD_WORDS,
  SAVE_WORDS,
  saveWords
} from "./actions";

import DataService from "../../../services/DataService";

function* onLoadComponentDidMount() {
  try {
    yield all([
      call(onLoadWords())
    ]);
  } catch (e) {
    // dispatch error action
    console.error(e);
  }
}

function* onLoadWords() {

  try {

    const words = yield call(DataService.getCategoriasReceitas);
    yield put(saveWords(words.data));

  } catch (e) {
    console.error(e);
  }
  
}

export default all([
  takeLatest(LOAD_WORDS, onLoadCategoryExpenses),
  takeLatest(SAVE_WORDS, onLoadCategoryIncomes)
]);