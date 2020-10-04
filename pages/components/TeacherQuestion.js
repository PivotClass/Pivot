import React, { useEffect, useState } from 'react';
import { RoomService } from "@roomservice/browser";

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

    function useList(roomName, listName) {
        const [list, setList] = useState();
        useEffect(() => {
            let isMounted = true;

            async function load() {
                const client = new RoomService({
                    auth: "/api/roomservice",
                });
                const room = await client.room(roomName);
                const l = await room.list(listName);
                if (isMounted) setList(l);

                room.subscribe(l, (li) => {
                    console.log(li);
                    if (isMounted) setList(li);
                });
            }

            load();
            return () => {
                isMounted = false
            };
        }, []);

        return [list, setList];
    }

    const [cardList, setCardList] = useList(props.roomName, props.listName);

    function deleteQuestion(id) {
        if (!cardList) return;
        setCardList(cardList.delete(getIndexById(id)));
    }

    function answerQuestion(id) {
        if (!cardList) return;
        const currentStruct = cardList.get(getIndexById(id));
        currentStruct['answered'] = true;
        setCardList(cardList.set(getIndexById(id), currentStruct));
    }

    function getIndexById(id) {
        if (!cardList) return -1;
        for (let i = 0; i < cardList.toArray().length; i++) {
            if (cardList.get(i)["cardID"] == id) return i;
        }
        return -1;
    }

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

                        : (props.teacherView ?
                        <>
                            <Divider variant="middle"/>
                            <CardActions>
                                <Button onClick={() => {
                                    answerQuestion(props.cardID)
                                }} variant="outlined" color="primary" className={classes.button}>
                                    Mark Answered
                                </Button>
                                <Button onClick={() => {
                                    deleteQuestion(props.cardID)
                                }} variant="outlined" color="secondary" className={classes.button}>
                                    Delete
                                </Button>
                            </CardActions></>
                        : (props.authorID === props.viewerID ?
                            <>
                                <Divider variant="middle"/>
                                <CardActions>
                                    <Button onClick={() => {
                                        deleteQuestion(props.cardID)
                                    }} variant="outlined" color="secondary" className={classes.button}>
                                        Dismiss Question
                                    </Button></CardActions></>
                            : null))}

            </Card>
        </StylesProvider>
    );
}