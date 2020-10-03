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
import { StylesProvider } from '@material-ui/core/styles'

const teacherQuestionStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        width: "100%",
        backgroundColor: "lightgoldenrodyellow",
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

export default function TeacherQuestion(props) {
    const classes = teacherQuestionStyles();

    return (
        <StylesProvider>
            <Card className={classes.root} variant="outlined" width="100%">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Student Question
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.title}
                    </Typography>
                </CardContent>

                {
                    props.answered ?
                        <>
                            <Divider variant="middle"/>
                            <CardActions>
                                <Button variant="outlined" color="primary" className={classes.button} disabled>
                                    Answered!
                                </Button>
                            </CardActions></>
                        :
                        props.teacher ?
                            <>
                                <Divider variant="middle"/>
                                <CardActions>
                                    <Button variant="outlined" color="primary" className={classes.button}>
                                        Mark Answered
                                    </Button>
                                    <Button variant="outlined" color="secondary" className={classes.button}>
                                        Delete
                                    </Button>
                                </CardActions></>
                            : null
                }
            </Card>
        </StylesProvider>
    );
}