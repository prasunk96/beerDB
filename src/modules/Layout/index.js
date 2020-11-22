import React, { Component } from 'react';
import SearchAppBar from '../Header';
import BeerCard from '../UiComponents/Cards';
import Grid from '@material-ui/core/Grid';
import PaginationBar from '../Pagination';
import { fetchBeersList, handlePageChange, handleSearchForBeers, handleSearchDataPageChange } from './actions';
import { connect } from 'react-redux';
import styles from './style.module.css';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false
        }
    }
    componentDidMount() {
        this.props.onFetchBeersList();
    };

    handleIsSearching = (value) => {
        this.setState({
            isSearch: value
        })
    }

    render() {
        const { beersList, totalPages, currentPage, onHandlePageChange, onHandleSearchForBeers, searchResultList, totalpagesOfSearchResults, searchedDataCurrentPage, onHandleSearchDataPageChange } = this.props;
        const { isSearch } = this.state;
        const pageData = isSearch ?  searchResultList && searchResultList[searchedDataCurrentPage - 1] : beersList && beersList[currentPage - 1];
        return (<Grid className={styles.root} container>
            <Grid item xs={12} className={styles.appbarContainer}>
                <SearchAppBar onHandleSearchForBeers={onHandleSearchForBeers} handleIsSearching={this.handleIsSearching}/>
            </Grid>
            <Grid className={styles.cardsContainer} container justify="center" spacing={2}>
                {pageData ? pageData.map(item => <Grid key={item.id} item xs={12} sm={3}>
                    <BeerCard beer={item} />
                </Grid>) : null}
            </Grid>
            <Grid item xs={12} className={styles.paginationContiner}>
                <PaginationBar item xs={12} totalPages={ isSearch ? totalpagesOfSearchResults : totalPages} 
                currentPage={isSearch ? searchedDataCurrentPage : currentPage} onHandlePageChange={isSearch ? onHandleSearchDataPageChange : onHandlePageChange}
                />
            </Grid>
        </Grid>);
    }
};

const mapStateToProps = (state) => ({
    beersList: state.layout.beersList,
    totalPages: state.layout.totalPages,
    currentPage: state.layout.currentPage,
    searchResultList: state.layout.searchResultList,
    totalpagesOfSearchResults: state.layout.totalpagesOfSearchResults,
    searchedDataCurrentPage: state.layout.searchedDataCurrentPage,
    beerImageList: state.layout.beerImageList
});

const mapDispatchToProps = (dispatch) => ({
    onFetchBeersList: () => dispatch(fetchBeersList()),
    onHandlePageChange: (dir) => dispatch(handlePageChange(dir)),
    onHandleSearchForBeers: (searchString) => dispatch(handleSearchForBeers(searchString)),
    onHandleSearchDataPageChange: (dir) => dispatch(handleSearchDataPageChange(dir))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);