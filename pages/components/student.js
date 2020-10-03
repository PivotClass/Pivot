import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { sizing } from '@material-ui/system';
import { StylesProvider } from '@material-ui/core/styles'

import StudentPoll from "./StudentPoll"
import StudentQuestion from "./StudentQuestion"
import Tooltip from "./Tooltip"

// Student styles.
const studentStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
    },
}));

// Example card list that is loaded on components/student.
const exampleCardList = [
    {
        type: "poll",
        mcq: true,
        question: "Chicago is a...",
        choices: ["City", "Country", "State", "Town", "Continent"],
    },
    {
        type: "poll",
        mcq: false,
        question: "Fill in what Chicago is!"
    },
    {
        type: "studentQuestion",
    },
    {
        type: "tooltip",
        title: "Derivative",
        content: "A derivative is the infinitesimal rate of change in a function with respect to one of its parameters."
    },
    {
        type: "tooltip",
        title: "l'Hôpital's rule",
        subtitle: "(mathematical problem)",
        content: "Suppose that lim(f(x)) and lim(g(x)) are both zero or both ±∞. Then l'Hôpital's rule states that if lim(f'(x)/(g'(x))) has a finite limit or the limit is ±∞, then lim(f(x)/(g(x))) = lim(f'(x)/(g'(x)))."
    },
    {},
]

// Creates a card from a cardStruct. I would define a cardStruct type but since js doesn't take types anyways so.
function createCard(cardStruct) {
    switch (cardStruct.type) {
        case "poll":
            if (cardStruct.mcq) {
                return (
                    <ListItem width="100%">
                    <StudentPoll
                        question={cardStruct.question}
                        mcq={true}
                        choices={cardStruct.choices}
                        width="100%"/>
                    </ListItem>
                );
            } else {
                return (
                    <ListItem width="100%">
                    <StudentPoll
                        question={cardStruct.question}
                        mcq={false}
                        width="100%"/>
                    </ListItem>
                );
            }
        case "studentQuestion":
            return (
                <ListItem width="100%">
                    <StudentQuestion width="100%"/>
                </ListItem>
            );
        case "tooltip":
            return (
                <ListItem width="100%">
                    <Tooltip
                        width="100%"
                        title={cardStruct.title}
                        subtitle={cardStruct.subtitle}
                        content={cardStruct.content}
                    />
                </ListItem>
            );
    }
}

// Student feed.
export default function StudentFeed() {
    const classes = studentStyles();

    return (
        <StylesProvider>
            <List className={classes.root} width="100%">
                {exampleCardList.map((elt) => createCard(elt))}
            </List>
        </StylesProvider>
    );
}
