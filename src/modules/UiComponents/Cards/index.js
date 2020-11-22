import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: 200,
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        alignItems: 'flex-start'
    },
    cover: {
        width: 151,
    },
    headingStyle: {
        textAlign: 'start'
    },
    detailsBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
}));

export default function BeerCard({ beer }) {
    const classes = useStyles();
    const { name, image, style, abv, ibu, ounces } = beer;

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6" className={classes.headingStyle}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" className={classes.headingStyle}>
                        {style}
                    </Typography>
                    <Box component="div" className={classes.detailsBox}>
                        <Typography variant="subtitle1" color="textPrimary">
                            {`ABV: ${abv}`}
                        </Typography>
                        <Typography variant="subtitle1" color="textPrimary">
                            {`IBU: ${ibu}`}
                        </Typography>
                        <Typography variant="subtitle1" color="textPrimary">
                            {`OUNCES: ${ounces}`}
                        </Typography>
                    </Box>
                </CardContent>
                <div className={classes.controls}>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={image}
                title={name}
            />
        </Card>
    );
}


