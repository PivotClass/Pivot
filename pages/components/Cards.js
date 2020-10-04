import React, { useEffect, useState } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from '@material-ui/core/ListSubheader';
// import StudentPoll from "./StudentPoll";
// import StudentQuestion from "./StudentQuestion";
import Tooltip from "./Tooltip";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
// import TeacherQuestion from "./TeacherQuestion";
// import TooltipCreator from './TooltipCreator';
import { RoomService } from "@roomservice/browser";
import LensIcon from "@material-ui/icons/Lens";
import SpaIcon from "@material-ui/icons/Spa";
import StarIcon from "@material-ui/icons/Star";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import WbCloudyIcon from "@material-ui/icons/WbCloudy";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

// Card styles.
const cardStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 450,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
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
}));

// Main cards function.
export default function Cards(props) {
    // Imports Styles
    const classes = cardStyles();

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

        console.log("Cards got cardList from Room Service.");
        console.log(list);
        return [list, setList];
    }

    const [cardList, setCardList] = useList(props.roomName, props.listName);

    // SECTION: StudentQuestion
    const [studentDialogOpen, setStudentDialogOpen] = useState(false);
    const handleStudentQuestionOpen = () => {
        setStudentDialogOpen(true);
    };
    const handleStudentQuestionClose = () => {
        setStudentDialogOpen(false);
    };

    function StudentQuestionDialog(props) {
        const [questionTextbox, setQuestionTextbox] = useState("");

        function sendPublicQuestion() {
            if (!cardList) return;
            if (questionTextbox === "") {
                alert("please enter a question to ask anonymously!");
                return;
            }
            const newQuestion = {
                type: "publicQuestion",
                title: questionTextbox,
                answered: false,
                studentID: props.studentID
            }
            newQuestion["cardID"] = JSON.stringify(newQuestion) + Math.random();
            setCardList(cardList.push(newQuestion));
            props.onClose();
        }

        return (
            <StylesProvider>
                <Dialog width="100%" style={{minWidth: 275, width: "100%",}} open={props.open} onClose={props.onClose}>
                    <DialogContent style={{backgroundColor: "lightgoldenrodyellow"}}>
                        <TextField
                            id="filled-basic-questionbox-studentquestion"
                            label="Question"
                            variant="outlined"
                            fullWidth
                            type="text"
                            value={questionTextbox}
                            onChange={(e) => setQuestionTextbox(e.target.value)}
                            multiline={true}
                            margin={"normal"}
                        />
                        <Typography color="textSecondary" style={{fontSize: 12, marginBottom: 12,}}>
                            Ask an anonymous question to the instructor!
                        </Typography>
                    </DialogContent>
                    <Divider/>
                    <DialogActions style={{backgroundColor: "lightgoldenrodyellow"}}>
                        <Button onClick={sendPublicQuestion} variant="outlined" color="primary" style={{margin: 8,}}>
                            Ask
                        </Button>
                    </DialogActions>
                </Dialog>
            </StylesProvider>
        );
    }

    // End of Student Question

    // SECTION: TeacherPoll
    const [teacherPollOpen, setTeacherPollOpen] = useState(false);
    const handleTeacherPollOpen = () => {
        setTeacherPollOpen(true);
    };
    const handleTeacherPollClose = () => {
        setTeacherPollOpen(false);
    };

    function TeacherPoll(props) {
        const [answerChoice0, setAnswerChoice0] = useState("");
        const [answerChoice1, setAnswerChoice1] = useState("");
        const [answerChoice2, setAnswerChoice2] = useState("");
        const [answerChoice3, setAnswerChoice3] = useState("");
        const [answerChoice4, setAnswerChoice4] = useState("");

        const answerChoices = [answerChoice0, answerChoice1, answerChoice2, answerChoice3, answerChoice4]
        const setAnswerChoices = [setAnswerChoice0, setAnswerChoice1, setAnswerChoice2, setAnswerChoice3, setAnswerChoice4]

        function updateAnswerChoices(str, idx) {
            setAnswerChoices[idx](str)
        }

        const [questionTextbox, setQuestionTextbox] = useState("");

        const icons = [<LensIcon/>, <SpaIcon/>, <StarIcon/>, <HourglassFullIcon/>, <WbCloudyIcon/>];
        const labels = ["Choice A", "Choice B", "Choice C", "Choice D", "Choice E"]

        function sendPoll() {
            if (!cardList) return;
            console.log(cardList.toArray());
            if (questionTextbox === "") {
                alert("please enter a poll question!");
                return;
            }
            const newPoll = {
                type: "poll",
                mcq: !isEmpty(answerChoices),
                question: questionTextbox,
                answers: {},
                responsesPublic: false
            }
            if (!isEmpty(answerChoices)) newPoll["choices"] = answerChoices.slice();
            newPoll["cardID"] = JSON.stringify(newPoll) + Math.random();
            setCardList(cardList.push(newPoll));
            props.onClose();
        }

        function isEmpty(stringArr) {
            for (let i = 0; i < stringArr.length; i++) {
                if (stringArr[i] !== "") return false;
            }
            return true;
        }

        return (
            <StylesProvider>
                <Dialog width="100%" style={{minWidth: 275, width: "100%",}} open={props.open} onClose={props.onClose}>
                    <DialogContent style={{backgroundColor: "lightcyan"}}>
                        <TextField
                            id="filled-basic-questionbox-teacherpoll"
                            label="Instructor Question"
                            variant="outlined"
                            fullWidth
                            // style={styles.input}
                            type="text"
                            value={questionTextbox}
                            onChange={(e) => setQuestionTextbox(e.target.value)}
                            multiline={true}
                            margin={"normal"}
                        />
                        <Typography style={{fontSize: 10, marginBottom: 12,}} color="textSecondary">
                            Leave all answer choices blank to pose this as a free-response question.
                        </Typography>
                        <List dense>
                            {icons.map((icon, idx) => {
                                    return (
                                        <ListItem key={idx}>
                                            <ListItemIcon>
                                                <IconButton aria-label="delete" color="primary" size="small">
                                                    {icon}
                                                </IconButton>
                                            </ListItemIcon>
                                            <TextField
                                                id={"filled-basic-questionbox-updateanswerchoices-" + idx}
                                                label={labels[idx]}
                                                variant="outlined"
                                                size={"small"}
                                                fullWidth
                                                type="text"
                                                value={answerChoices[idx]}
                                                onChange={(e) => updateAnswerChoices(e.target.value, idx)}
                                                multiline={false}
                                            />
                                        </ListItem>
                                    );
                                }
                            )}
                        </List>
                    </DialogContent>
                    <Divider variant="middle"/>
                    <DialogActions style={{backgroundColor: "lightcyan"}}>
                        <Button onClick={() => sendPoll()} variant="outlined" color="primary" style={{margin: 8,}}>
                            Poll Students
                        </Button>
                    </DialogActions>
                </Dialog>
            </StylesProvider>
        );
    }

    // End of teacher poll

    // Tooltip Creator
    const [tooltipCreatorOpen, setTooltipCreatorOpen] = useState(false);
    const handleToolTipCreatorOpen = () => {
        setTooltipCreatorOpen(true);
    };
    const handleTooltipCreatorClose = () => {
        setTooltipCreatorOpen(false);
    };

    function TooltipCreator(props) {
        const [tooltipTextbox, setTooltipTextbox] = useState("");

        function sendTooltip() {
            if (!cardList) return;
            if (tooltipTextbox === "") {
                alert("please enter a tooltip!");
                return;
            }
            const newTooltip = {
                type: "tooltip",
                content: tooltipTextbox
            }
            newTooltip["cardID"] = JSON.stringify(newTooltip) + Math.random();
            setCardList(cardList.push(newTooltip));
            props.onClose();
        }

        return (
            <StylesProvider>
                <Dialog style={{minWidth: 275, width: "100%",}}
                        variant="outlined" width="100%"
                        open={props.open}
                        onClose={props.onClose}>
                    <DialogContent style={{backgroundColor: "lightpink",}}>
                        <TextField
                            id="filled-basic-questionbox-tooltip"
                            label="Instructor Tip"
                            variant="outlined"
                            fullWidth
                            // style={styles.input}
                            type="text"
                            value={tooltipTextbox}
                            onChange={(e) => setTooltipTextbox(e.target.value)}
                            multiline={true}
                            margin={"normal"}
                        />
                        <Typography style={{
                            fontSize: 12,
                            marginBottom: 12,
                        }} color="textSecondary">
                            Enter a message you think will be helpful to students.
                        </Typography>
                    </DialogContent>
                    <Divider/>
                    <DialogActions style={{backgroundColor: "lightpink",}}>
                        <Button onClick={() => sendTooltip()} variant="outlined" color="primary"
                                style={{margin: 8,}}>
                            Send Tooltip
                        </Button>
                    </DialogActions>
                </Dialog>
            </StylesProvider>
        );
    }

    // End of TooltipCreator

    // STUDENT POLL
    function StudentPoll(props) {
        const icons = [<LensIcon/>, <SpaIcon/>, <StarIcon/>, <HourglassFullIcon/>, <WbCloudyIcon/>];

        const [currentChoice, setCurrentChoice] = useState(-1);
        const [answerText, setAnswerText] = useState("");

        const [expanded, setExpanded] = React.useState(false);
        const [publicPrivate, setPublicPrivate] = useState((props.public ? "private" : "public"));

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };

        function clickedAnswerButton(idx) {
            console.log("HERE");
            if (!cardList) return;
            const index = getIndexById(props.cardID);
            const temp = cardList.get(index);
            if (idx === currentChoice) {
                setCurrentChoice(-1);
                temp["answers"][props.studentID] = -1;

            } else {
                setCurrentChoice(idx);
                temp["answers"][props.studentID] = idx;

            }
            setCardList(cardList.set(index, temp));
            console.log(cardList.toArray());
        }

        function answerTextChanged(txt) {
            setAnswerText(txt);
            if (!cardList) return;
            const index = getIndexById(props.cardID);
            const temp = cardList.get(index);
            temp["answers"][props.studentID] = txt;
            setCardList(cardList.set(index, temp));
            console.log("CHANGED");
            console.log(cardList.toArray());
        }

        const togglePublicPrivate = () => {
            if (!(expanded && publicPrivate === "public")) handleExpandClick();
            if (publicPrivate === "public") {
                if (cardList) {
                    const index = getIndexById(props.cardID);
                    const temp = cardList.get(index);
                    temp["responsesPublic"] = true;
                    setCardList(cardList.set(index, temp));
                }
                setPublicPrivate("private");
            } else {
                if (cardList) {
                    const index = getIndexById(props.cardID);
                    const temp = cardList.get(index);
                    temp["responsesPublic"] = false;
                    setCardList(cardList.set(index, temp));
                }
                setPublicPrivate("public");
            }
        }

        const getFrequency = (arr, value) => {
            let count = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === value) count++
            }
            return count;
        }


        function getIndexById(id) {
            if (!cardList) return -1;
            for (let i = 0; i < cardList.toArray().length; i++) {
                if (cardList.get(i)["cardID"] === id) return i;
            }
            return -1;
        }


        if (!props.teacherView) {
            if (props.public && !expanded) setExpanded(true);
            if (!props.public && expanded) setExpanded(false);
        }

        function createListChoices(answerChoices) {
            return (
                <List dense>
                    {answerChoices.map((answerChoice, idx) => {
                        if (answerChoice === "") return;
                        return (
                            <ListItem key={idx}>
                                <ListItemIcon>
                                    <IconButton
                                        aria-label="delete"
                                        color={currentChoice === idx ? "secondary" : "primary"}
                                        size="small"
                                        onClick={() => (!(props.teacherView || props.public) ? clickedAnswerButton(idx) : null)}
                                    >
                                        {icons[idx]}
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText
                                    primary={answerChoice}
                                    secondary={(expanded && cardList) ? getFrequency(Object.values(cardList.get(getIndexById(props.cardID))["answers"]), idx) : null} // TODO: Live buttons!
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
                        disabled={props.teacherView || props.public}
                        id="filled-basic-questionbox-answerbox"
                        label={(!props.public ? "Answer" : "Locked")}
                        variant="outlined"
                        fullWidth
                        // style={styles.input}
                        type="text"
                        value={answerText}
                        onChange={(e) => answerTextChanged(e.target.value)}
                        multiline={true}
                        margin={"normal"}
                    />
                    <Typography style={{fontSize: 12, marginBottom: 12,}} color="textSecondary">
                        {(!props.teacherView ? "Your answer will be recorded automatically. You may change your answer at any time before the poll is closed." : null)}
                    </Typography></>);
        }

        return (
            <StylesProvider>
                <Card style={{minWidth: 275, width: "100%", backgroundColor: "lightcyan",}}
                      variant="outlined" width="100%">
                    <CardContent>
                        <Typography style={{fontSize: 14,}} color="textSecondary" gutterBottom>
                            Instructor Poll
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {props.question}
                        </Typography>
                        <Typography style={{fontSize: 12, marginBottom: 12,}} color="textSecondary">
                            {props.mcq ? "multiple choice question" : "free response question"}
                        </Typography>
                        {props.mcq ? createListChoices(props.choices) : createAnswerBox()}
                    </CardContent>
                    {(props.teacherView) ? (
                        <CardActions width="100%" disableSpacing>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={() => {
                                    if (!(expanded && publicPrivate === "private")) handleExpandClick()
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
                            onClick={togglePublicPrivate}
                            aria-expanded={expanded}
                            aria-label="show more"
                            variant="outlined"
                            color="primary"
                        > {(publicPrivate === "public" ? "Lock Poll" : "Unlock Poll")}
                        </Button>
                    </CardActions>) : null}
                    {(expanded && !props.mcq) ? <Divider variant="middle"/> : null}
                    <ul>{(expanded && !props.mcq && cardList) ? (
                        Object.values(cardList.get(getIndexById(props.cardID))["answers"]).map((answer, idx) => {
                            if (answer === "") return;
                            return (<li key={idx}> {answer} </li>);
                        })
                    ) : null}</ul>
                </Card>
            </StylesProvider>
        );
    }

    // End of StudentPoll

    function TeacherQuestion(props) {

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
                if (cardList.get(i)["cardID"] === id) return i;
            }
            return -1;
        }

        return (
            <StylesProvider>
                <Card style={{
                    minWidth: 275,
                    width: "100%",
                    backgroundColor: "lightgoldenrodyellow",
                }}
                      variant="outlined" width="100%">
                    <CardContent>
                        <Typography style={{fontSize: 14,}} color="textSecondary" gutterBottom>
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
                                    <Button variant="outlined" color="primary" style={{margin: 8,}} disabled>
                                        Answered!
                                    </Button>
                                </CardActions></>

                            : (props.teacherView ?
                            <>
                                <Divider variant="middle"/>
                                <CardActions>
                                    <Button onClick={() => {
                                        answerQuestion(props.cardID)
                                    }} variant="outlined" color="primary" style={{margin: 8,}}>
                                        Mark Answered
                                    </Button>
                                    <Button onClick={() => {
                                        deleteQuestion(props.cardID)
                                    }} variant="outlined" color="secondary" style={{margin: 8,}}>
                                        Delete
                                    </Button>
                                </CardActions></>
                            : (props.authorID === props.viewerID ?
                                <>
                                    <Divider variant="middle"/>
                                    <CardActions>
                                        <Button onClick={() => {
                                            deleteQuestion(props.cardID)
                                        }} variant="outlined" color="secondary" style={{margin: 8,}}>
                                            Dismiss Question
                                        </Button></CardActions></>
                                : null))}

                </Card>
            </StylesProvider>
        );
    }

    // Creates a card from a cardStruct. I would define a cardStruct type but since js doesn't take types anyways so.
    function createCard(cardStruct, idx) {
        switch (cardStruct.type) {
            case "poll":
                if (cardStruct.mcq) {
                    return (
                        <ListItem key={idx} width="100%">
                            <StudentPoll
                                studentID={props.studentID}
                                cardID={cardStruct.cardID}
                                roomName={props.roomName}
                                listName={props.listName}
                                public={cardStruct.responsesPublic}
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
                                cardID={cardStruct.cardID}
                                roomName={props.roomName}
                                listName={props.listName}
                                public={cardStruct.responsesPublic}
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
        }
    }

    const reversedCardList = (cardList ? cardList.toArray().reverse() : null);

    return (
        <StylesProvider>
            <div>
                <List className={classes.root} width="100%">
                    {/* Toolbox Display */}
                    <ListSubheader>
                        <div
                            style={{
                                minWidth: 275,
                                width: "100%",
                                padding: 8,
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor: "transparent",
                            }}
                        >
                            {
                                props.teacherView ?
                                    <>
                                        <Button variant="outlined"
                                                style={{margin: 8,}}
                                                color={"primary"}
                                                onClick={handleTeacherPollOpen}>
                                            Poll
                                        </Button>
                                        <Button variant="outlined"
                                                style={{margin: 8,}}
                                                color="secondary"
                                                onClick={handleToolTipCreatorOpen}>
                                            Tooltip
                                        </Button></>
                                    :
                                    <Button variant="contained"
                                            style={{margin: 8,}}
                                            color="secondary"
                                            onClick={handleStudentQuestionOpen}>
                                        Ask Question
                                    </Button>
                            }
                        </div>
                        <Divider variant={"middle"}/>
                    </ListSubheader>
                    {/* Main cards display */}
                    {reversedCardList ? reversedCardList.map((elt, idx) => {
                        if (elt.type != "teacherPoll" && elt.type != "studentQuestion" && elt.type != "tooltipCreator") return createCard(elt, idx);
                        return;
                    }) : <Typography style={{textAlign: "center",}}><br /><br /><br />{props.teacherView ? "Create a card to get started!" : "Hang tight! We're loading your cards." }</Typography>}
                </List>
                <StudentQuestionDialog open={studentDialogOpen} onClose={handleStudentQuestionClose}/>
                <TeacherPoll open={teacherPollOpen} onClose={handleTeacherPollClose}/>
                <TooltipCreator open={tooltipCreatorOpen} onClose={handleTooltipCreatorClose}/>
            </div>
        </StylesProvider>
    );
}