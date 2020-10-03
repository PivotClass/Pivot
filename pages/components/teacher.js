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

import TeacherPoll from "./TeacherPoll"
import TeacherQuestion from "./TeacherQuestion"
import Tooltip from "./Tooltip"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TeacherFeed() {
    const classes = useStyles();

    return (
        <List className={classes.root} width="100%">
            <ListItem width="100%">
                <TeacherPoll width="100%"/>
            </ListItem>
            <ListItem width="100%">
                <TeacherQuestion width="100%"/>
            </ListItem>
            <ListItem width="100%">
                <Tooltip width="100%"/>
            </ListItem>
        </List>
    );
}
