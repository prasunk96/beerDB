import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    paginationButtons: {
        height: 40,
        width: 40
    }
});

export default function PaginationBar({ totalPages, currentPage, onHandlePageChange }) {
    const classes = useStyles();
    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;
    return (
        <div
            className={classes.root}
        >
            <IconButton variant="contained" aria-label="previous" className={classes.paginationButtons} onClick={() => onHandlePageChange('prev')} disabled={prevDisabled}>
                <ArrowBackIosIcon />
            </IconButton>
            <label>{`${currentPage}/${totalPages}`}</label>
            <IconButton variant="contained" aria-label="next" className={classes.paginationButtons} onClick={() => onHandlePageChange('next')} disabled={nextDisabled}>
                <ArrowForwardIosIcon />
            </IconButton>
        </div>
    );
}

