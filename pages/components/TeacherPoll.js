// import React, { useEffect, useState } from 'react';
// import { RoomService } from "@roomservice/browser";
//
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import FolderIcon from '@material-ui/icons/Folder';
// import LensIcon from '@material-ui/icons/Lens';
// import SpaIcon from '@material-ui/icons/Spa';
// import StarIcon from '@material-ui/icons/Star';
// import HourglassFullIcon from '@material-ui/icons/HourglassFull';
// import WbCloudyIcon from '@material-ui/icons/WbCloudy';
// import TextField from "@material-ui/core/TextField";
// import MenuItem from '@material-ui/core/MenuItem';
// import { sizing } from '@material-ui/system';
// import { StylesProvider } from '@material-ui/core/styles'
//
// const teacherPollStyles = makeStyles((theme) => ({
//     root: {
//         minWidth: 275,
//         width: "100%",
//         backgroundColor: "lightcyan",
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         fontSize: 10,
//         marginBottom: 12,
//     },
//     button: {
//         margin: theme.spacing(1),
//     },
// }));
//
// // Private: Not viewed in shared feed.
// export default function TeacherPoll(props) {
//     const classes = teacherPollStyles();
//
//     const [answerChoice0, setAnswerChoice0] = useState("");
//     const [answerChoice1, setAnswerChoice1] = useState("");
//     const [answerChoice2, setAnswerChoice2] = useState("");
//     const [answerChoice3, setAnswerChoice3] = useState("");
//     const [answerChoice4, setAnswerChoice4] = useState("");
//
//     const answerChoices = [answerChoice0, answerChoice1, answerChoice2, answerChoice3, answerChoice4]
//     const setAnswerChoices = [setAnswerChoice0, setAnswerChoice1, setAnswerChoice2, setAnswerChoice3, setAnswerChoice4]
//
//     function updateAnswerChoices(str, idx) {
//         setAnswerChoices[idx](str)
//     }
//
//     const [questionTextbox, setQuestionTextbox] = useState("");
//
//     const icons = [<LensIcon/>, <SpaIcon/>, <StarIcon/>, <HourglassFullIcon/>, <WbCloudyIcon/>];
//     const labels = ["Choice A", "Choice B", "Choice C", "Choice D", "Choice E"]
//
//     function useList(roomName, listName) {
//         const [list, setList] = useState();
//         useEffect(() => {
//             let isMounted = true;
//           async function load() {
//             const client = new RoomService({
//               auth: "/api/roomservice",
//             });
//             const room = await client.room(roomName);
//             const l = await room.list(listName);
//             if (isMounted) setList(l);
//
//             room.subscribe(l, (li) => {
//               console.log(li);
//               if (isMounted) setList(li);
//             });
//           }
//           load();
//           return () => {isMounted=false};
//         }, []);
//
//         return [list, setList];
//     }
//
//     const [cardList, setCardList] = useList(props.roomName, props.listName)
//
//     function sendPoll() {
//
//         if (!cardList) return;
//         console.log(cardList.toArray());
//         if (questionTextbox == "") {
//             alert("please enter a poll question!");
//             return;
//         }
//         const newPoll = {
//             type: "poll",
//             mcq: !isEmpty(answerChoices),
//             question: questionTextbox,
//             answers: {},
//             responsesPublic: false
//         }
//         if (!isEmpty(answerChoices)) newPoll["choices"] = answerChoices.slice();
//         newPoll["cardID"] = JSON.stringify(newPoll) + Math.random();
//         setCardList(cardList.push(newPoll));
//     }
//
//     function isEmpty(stringArr) {
//         for (let i = 0; i < stringArr.length; i++) {
//             if (stringArr[i] !== "") return false;
//         }
//         return true;
//     }
//
//     return (
//         <StylesProvider>
//             <Card style={{minWidth: 275, width: "100%",}} variant="outlined" width="100%">
//                 <CardContent>
//                     <TextField
//                         id="filled-basic-questionbox-teacherpoll"
//                         label="Instructor Question"
//                         variant="outlined"
//                         fullWidth
//                         // style={styles.input}
//                         type="text"
//                         value={questionTextbox}
//                         onChange={(e) => setQuestionTextbox(e.target.value)}
//                         multiline={true}
//                         margin={"normal"}
//                     />
//                     <Typography style={{fontSize: 10, marginBottom: 12,}} color="textSecondary">
//                         Leave all answer choices blank to pose this as a free-response question.
//                     </Typography>
//                     <List dense>
//                         {icons.map((icon, idx) => {
//                             return (
//                                 <ListItem key={idx}>
//                                     <ListItemIcon>
//                                         <IconButton aria-label="delete" color="primary" size="small">
//                                             {icon}
//                                         </IconButton>
//                                     </ListItemIcon>
//                                     <TextField
//                                         id={"filled-basic-questionbox-updateanswerchoices-" + idx}
//                                         label={labels[idx]}
//                                         variant="outlined"
//                                         size={"small"}
//                                         fullWidth
//                                         type="text"
//                                         value={answerChoices[idx]}
//                                         onChange={(e) => updateAnswerChoices(e.target.value, idx)}
//                                         multiline={false}
//                                     />
//                                 </ListItem>
//                             );
//                             }
//                         )}
//                     </List>
//                 </CardContent>
//                 <Divider variant="middle"/>
//                 <CardActions>
//                     <Button onClick={() => sendPoll()} variant="outlined" color="primary" style={{margin: 8,}}>
//                         Poll Students
//                     </Button>
//                 </CardActions>
//             </Card>
//         </StylesProvider>
//     );
// }

export default function TeacherPoll() {
    return (
        <div />
    )
}