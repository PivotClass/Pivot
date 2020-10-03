import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        width: "100%",
        backgroundColor: "lightpink",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        fontSize: 12,
        marginBottom: 12,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function StudentPoll() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined" width="100%">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Topic
                </Typography>
                <Typography variant="h5" component="h2">
                    l'Hôpital's rule
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    (mathematical problem)
                </Typography>
                <Typography variant="body2" component="p">
                    Suppose that lim(f(x)) and lim(g(x)) are both zero or both ±∞. Then l'Hôpital's rule states that if lim(f'(x)/(g'(x))) has a finite limit or the limit is ±∞, then lim(f(x)/(g(x))) = lim(f'(x)/(g'(x))).
                </Typography>
            </CardContent>
            <Divider variant="middle"/>
            <CardActions>
                <Button variant="outlined" color="primary" className={classes.button} size={"small"}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}