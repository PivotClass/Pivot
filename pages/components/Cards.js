import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import StudentPoll from "./StudentPoll";
import StudentQuestion from "./StudentQuestion";
import Tooltip from "./Tooltip";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import TeacherPoll from "./TeacherPoll";
import TeacherQuestion from "./TeacherQuestion";
import TooltipCreator from './TooltipCreator';

// Card styles.
const cardStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
    },
    left: {
        float: "left",
        width: "50%",
    },
    right: {
        float: "right",
        width: "50%",
    }
}));

export default function Cards(props) {
    const classes = cardStyles();

    // Creates a card from a cardStruct. I would define a cardStruct type but since js doesn't take types anyways so.
    function createCard(cardStruct, idx) {
        switch (cardStruct.type) {
            case "poll":
                if (cardStruct.mcq) {
                    return (
                        <ListItem key={idx} width="100%">
                            <StudentPoll
                                // cardID={cardStruct.cardID}
                                roomName={props.roomName}
                                listName={props.listName}
                                // public={cardStruct.responsesPublic}
                                answers={cardStruct.answers}
                                question={cardStruct.question}
                                mcq={true}
                                choices={cardStruct.choices}
                                teacherView={props.teacherView}
                                width="100%"/>
                        </ListItem>
                    );
                } else {
                    return (
                        <ListItem key={idx} width="100%">
                            <StudentPoll
                                // cardID={cardStruct.cardID}
                                roomName={props.roomName}
                                listName={props.listName}
                                // public={cardStruct.responsesPublic}
                                answers={cardStruct.answers}
                                question={cardStruct.question}
                                mcq={false}
                                choices={cardStruct.choices}
                                teacherView={props.teacherView}
                                width="100%"/>
                        </ListItem>
                    );
                }
            case "tooltip":
                return (
                    <ListItem key={idx} width="100%">
                        <Tooltip
                            width="100%"
                            teacherView={props.teacherView}
                            title={cardStruct.title}
                            subtitle={cardStruct.subtitle}
                            content={cardStruct.content}
                        />
                    </ListItem>
                );
            case "tooltipCreator": 
                if (props.teacherView) return (
                    <ListItem key={idx} width="100%">
                        <TooltipCreator roomName={props.roomName} listName={props.listName} width="100%"/>
                    </ListItem>
                );
                else return;
            case "publicQuestion":
                return (
                    <ListItem key={idx} width="100%">
                        <TeacherQuestion
                            cardID={cardStruct.cardID}
                            authorID={cardStruct.studentID}
                            viewerID={props.studentID}
                            roomName={props.roomName} 
                            listName={props.listName}
                            title={cardStruct.title}
                            teacherView={props.teacherView}
                            answered={cardStruct.answered}
                            width="100%"/>
                    </ListItem>
                )
            case "studentQuestion":
                if (!props.teacherView) return (
                    <ListItem key={idx} width="100%">
                        <StudentQuestion studentID={props.studentID} roomName={props.roomName} listName={props.listName} width="100%"/>
                    </ListItem>
                );
                else return;
            case "teacherPoll":
                if (props.teacherView) return (
                    <ListItem key={idx} width="100%">
                        <TeacherPoll roomName={props.roomName} listName={props.listName} width="100%"/>
                    </ListItem>
                );
                else return;
        }
    }

    return (
        <StylesProvider>
            <div className={classes.left}>
                <List className={classes.root} width="100%">
                    {props.cardList ? props.cardList.map((elt, idx) => {
                        if (elt.type != "teacherPoll" && elt.type != "studentQuestion" && elt.type != "tooltipCreator") return createCard(elt, idx);
                        return;
                    }) : null}
                </List>
            </div>
            <div className={classes.right}>
                <List className={classes.root} width="100%">
                    {props.cardList ? props.cardList.map((elt, idx) => {
                        if (elt.type == "teacherPoll" || elt.type == "studentQuestion" || elt.type == "tooltipCreator") return createCard(elt, idx);
                        return;
                    }) : null}
                </List>
            </div>
        </StylesProvider>
    );
}