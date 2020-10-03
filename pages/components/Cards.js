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

// Card styles.
const cardStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
    },
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
                                question={cardStruct.question}
                                mcq={true}
                                choices={cardStruct.choices}
                                width="100%"/>
                        </ListItem>
                    );
                } else {
                    return (
                        <ListItem key={idx} width="100%">
                            <StudentPoll
                                question={cardStruct.question}
                                mcq={false}
                                width="100%"/>
                        </ListItem>
                    );
                }
            case "tooltip":
                return (
                    <ListItem key={idx} width="100%">
                        <Tooltip
                            width="100%"
                            title={cardStruct.title}
                            subtitle={cardStruct.subtitle}
                            content={cardStruct.content}
                        />
                    </ListItem>
                );
            case "publicQuestion":
                return (
                    <ListItem key={idx} width="100%">
                        <TeacherQuestion
                            title={cardStruct.title}
                            teacher={props.teacher}
                            answered={cardStruct.answered}
                            width="100%"/>
                    </ListItem>
                )
            case "studentQuestion":
                return (
                    <ListItem key={idx} width="100%">
                        <StudentQuestion width="100%"/>
                    </ListItem>
                );
            case "teacherPoll":
                return (
                    <ListItem key={idx} width="100%">
                        <TeacherPoll width="100%"/>
                    </ListItem>
                );
        }
    }

    return (
        <StylesProvider>
            <List className={classes.root} width="100%">
                {props.cardList ? props.cardList.map((elt, idx) => createCard(elt, idx)) : null}
            </List>
        </StylesProvider>
    );
}