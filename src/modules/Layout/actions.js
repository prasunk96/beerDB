import * as actionTypes from './actionTypes';
import axios from 'axios';

const storeBeersList = (data, list, tp) => ({
    type: actionTypes.STORE_BEER_LIST,
    data,
    list,
    tp
});

const prepareBeerListDict = (arr, imageList) => {
    const size = 20;
    const chunkedArray = [];
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        if (counter <= 4) {
            arr[i].image = imageList[counter].image
            if (counter === 4) {
                counter = 0
            } else {
                counter = counter + 1;
            }
        }
       const last = chunkedArray[chunkedArray.length - 1];
       if(!last || last.length === size){
          chunkedArray.push([arr[i]]);
       }else{
          last.push(arr[i]);
       }
    };
    return chunkedArray;
 };

 const chunk = arr => {
    const size = 20;
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i++) {
       const last = chunkedArray[chunkedArray.length - 1];
       if(!last || last.length === size){
          chunkedArray.push([arr[i]]);
       }else{
          last.push(arr[i]);
       }
    };
    return chunkedArray;
 };

export const fetchBeersList = () => (dispatch) => {
    let beerList = [];
    axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json').then(res => {
        const { data } = res;
        beerList = data;
        return axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json')
    }).then(res => {

        const { data } = res;
        const dataDict = prepareBeerListDict(beerList, data);
        const totalPages = Math.ceil(beerList.length/20);

        dispatch(storeBeersList(beerList, dataDict, totalPages));
    }).catch(error => {
        console.log(error);
    });
}

export const handlePageChange = dir => ({
    type: actionTypes.HANDLE_CURRENT_PAGE_CHANGE,
    dir
});

export const handleSearchDataPageChange = dir => ({
    type: actionTypes.HANDLE_SEARCH_CURRENT_PAGE_CHANGE,
    dir
});

const storeSearchedBeerList = (searchedDict, totalPages) => ({
    type: actionTypes.HANDLE_SEARCHED_BEERS_DETAILS,
    searchedDict,
    totalPages
})

export const handleSearchForBeers = (searchString) => (dispatch, getState) => {
    if (searchString === '') {
        dispatch(storeSearchedBeerList([], 0));
    } else {
        const beersList = getState().layout.actualList
        const searchedData = beersList.filter(item => {
            const isThere = item.name.toUpperCase().includes(searchString.toUpperCase());
            return isThere;
        });
    
        const searchedDict = chunk(searchedData);
        const searchedDataTotalPages = Math.ceil(searchedData.length/20);
        dispatch(storeSearchedBeerList(searchedDict, searchedDataTotalPages));
    }
}