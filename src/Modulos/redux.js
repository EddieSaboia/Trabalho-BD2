import {
    SAVE_WORDS,
    LOAD_WORDS
} from "./actions"

const initialState = {
    words: []
};

const wordies = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_WORDS:
            return { ...state, words: { ...words, action } };
        case LOAD_WORDS:
            return state;
        default:
            return state;
    }
};

export default wordies;
