import * as actionTypes from './actionTypes';

const initialState = {
    actualList: [],
    beersList: [],
    pageSize: 20,
    totalPages: 0,
    currentPage: 1,
    searchResultList: [],
    totalpagesOfSearchResults: 0,
    searchedDataCurrentPage: 1
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_BEER_LIST:
            return {
                ...state,
                actualList: action.data,
                beersList: action.list,
                totalPages: action.tp
            }
        case actionTypes.HANDLE_CURRENT_PAGE_CHANGE:
            return {
                ...state,
                currentPage: action.dir === 'prev' ? state.currentPage - 1 : state.currentPage + 1
            }
        case actionTypes.HANDLE_SEARCHED_BEERS_DETAILS:
            return {
                ...state,
                searchResultList: action.searchedDict,
                totalpagesOfSearchResults: action.totalPages,
                searchedDataCurrentPage: 1
            }
        case actionTypes.HANDLE_SEARCH_CURRENT_PAGE_CHANGE:
            return {
                ...state,
                searchedDataCurrentPage: action.dir === 'prev' ? state.searchedDataCurrentPage - 1 : state.searchedDataCurrentPage + 1
            }
        default: return state;
    }
}

export default reducer;
