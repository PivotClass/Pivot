import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import LensIcon from '@material-ui/icons/Lens';
import SpaIcon from '@material-ui/icons/Spa';
import StarIcon from '@material-ui/icons/Star';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import { sizing } from '@material-ui/system';
import { StylesProvider } from '@material-ui/core/styles'
import TextField from "@material-ui/core/TextField";

const studentPollStyles = makeStyles({
    root: {
        minWidth: 275,
        width: "100%",
        backgroundColor: "lightcyan",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        fontSize: 12,
        marginBottom: 12,
    },
});

// Public: Viewed in shared feed!
export default function StudentPoll(props) {
    const classes = studentPollStyles();

    const icons = [<LensIcon/>, <SpaIcon/>, <StarIcon/>, <HourglassFullIcon/>, <WbCloudyIcon/>];

    const [currentChoice, setCurrentChoice] = useState(-1);
    const [answerText, setAnswerText] = useState("");

    function clickedAnswerButton(idx) {
        if (idx === currentChoice) {
            setCurrentChoice(-1)
        } else {
            setCurrentChoice(idx)
        }
    }

    function answerTextChanged(txt) {
        setAnswerText(txt);
    }

    function createListChoices(answerChoices) {
        return (
            <List dense>
                {answerChoices.map((answerChoice, idx) => {
                    return (
                        <ListItem>
                            <ListItemIcon>
                                <IconButton aria-label="delete"
                                            color={currentChoice === idx ? "secondary" : "primary"}
                                            size="small"
                                            onClick={() => clickedAnswerButton(idx)}
                                >
                                    {icons[idx]}
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={answerChoice}
                            />
                        </ListItem>
                    );
                })}
            </List>
        );
    }

    function createAnswerBox() {
        return (
            <>
                <TextField
                    id="filled-basic-questionbox"
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    // style={styles.input}
                    type="text"
                    value={answerText}
                    onChange={(e) => answerTextChanged(e.target.value)}
                    multiline={true}
                    margin={"normal"}
                />
                <Typography className={classes.pos} color="textSecondary">
                    Your answer will be recorded automatically. You may change your answer at any time.
                </Typography></>);
    }

    return (
        <StylesProvider>
            <Card className={classes.root} variant="outlined" width="100%">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Instructor Poll
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.question}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.mcq ? "multiple choice question" : "free response question"}
                    </Typography>
                    {props.mcq ? createListChoices(props.choices) : createAnswerBox()}
                </CardContent>
            </Card>
        </StylesProvider>
    );
}