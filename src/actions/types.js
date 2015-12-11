export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET';
export const CHECK_PASSWORD_RESET_TOKEN = 'CHECK_PASSWORD_RESET_TOKEN';
export const PERFORM_PASSWORD_RESET = 'PERFORM_PASSWORD_RESET';

// Generic START/DONE for asynchronous actions (handled by middleware)
// TODO: This will go away when we add sugar to reducers,
// https://trello.com/c/TIs00KwP/45-sugar-for-cleaner-reducers
export const START = 'START';
export const DONE = 'DONE';
