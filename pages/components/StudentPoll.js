import React, { useState, useEffect } from 'react';
import { RoomService } from "@roomservice/browser";


import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const studentPollStyles = makeStyles((theme) => ({
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
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    publicPrivateButton: {
        //backgroundColor: "#B0CCDD",
    }
}));


// Public: Viewed in shared feed!
export default function StudentPoll(props) {
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
          return () => {isMounted=false};
        }, []);
      
        return [list, setList];
    }

    // const [cardList, setCardList] = useList(props.roomName, props.listName)

    const classes = studentPollStyles();

    const icons = [<LensIcon/>, <SpaIcon/>, <StarIcon/>, <HourglassFullIcon/>, <WbCloudyIcon/>];

    const [currentChoice, setCurrentChoice] = useState(-1);
    const [answerText, setAnswerText] = useState("");

    const [expanded, setExpanded] = React.useState(false);

    
    const [publicPrivate, setPublicPrivate] = useState("public");


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

    const togglePublicPrivate = () => {
        if (!(expanded && publicPrivate == "public")) handleExpandClick();
        if (publicPrivate == "public") {
            // if (cardList) {
            //     const index = getIndexById(props.cardID);
            //     const temp = cardList.get(index);
            //     temp["responsesPublic"] = true;
            //     setCardList(cardList.set(index, temp));
            // }
            setPublicPrivate("private");
        }
        else {
            // if (cardList) {
            //     const index = getIndexById(props.cardID);
            //     const temp = cardList.get(index);
            //     temp["responsesPublic"] = false;
            //     setCardList(cardList.set(index, temp));
            // }
            setPublicPrivate("public");
        }

        
    }

    const getFrequency = (arr, value) => {
        let count=0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == value) count++
        }
        return count;
    }


    // function getIndexById(id) {
    //     if (!cardList) return -1;
    //     for (let i = 0; i < cardList.toArray().length; i++) {
    //         if (cardList.get(i)["cardID"] == id) return i;
    //     }
    //     return -1;
    // }


    function createListChoices(answerChoices) {
        return (
            <List dense>
                {answerChoices.map((answerChoice, idx) => {
                    if (answerChoice == "") return;
                    return (
                        <ListItem key={idx}>
                            <ListItemIcon>
                                <IconButton 
                                            aria-label="delete"
                                            color={currentChoice === idx ? "secondary" : "primary"}
                                            size="small"
                                            onClick={() => (!props.teacherView ? clickedAnswerButton(idx) : null)}
                                >
                                    {icons[idx]}
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText
                                primary={answerChoice}
                                secondary={expanded ? getFrequency(props.answers, answerChoice) : null} // TODO: Live buttons!
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
                    disabled={props.teacherView}
                    id="filled-basic-questionbox-answerbox"
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
                    {(!props.teacherView ? "Your answer will be recorded automatically. You may change your answer at any time." : null)}
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
                {(props.teacherView) ? (<CardActions width="100%" disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={() => {
                            if (!(expanded && publicPrivate == "private")) handleExpandClick()
                        }}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        {expanded ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </IconButton>
                </CardActions>) : null}
                {(props.teacherView) ? (<CardActions width="100%" disableSpacing>
                    {/* This button is for toggling STUDENT visibility; teachers can always see responses */}
                    <Button
                        className={classes.publicPrivateButton}
                        onClick={togglePublicPrivate}
                        aria-expanded={expanded}
                        aria-label="show more"
                        variant="outlined"
                        color="primary"
                    > Make Responses {publicPrivate} 
                    
                    </Button>
                </CardActions>) : null}
                <ul>{(expanded && !props.mcq) ? (
                    props.answers.map((answer, idx) => {
                        return (<li key={idx}> {answer} </li>);
                    })
                ) : null}</ul> 
            </Card>
        </StylesProvider>
    );
}
