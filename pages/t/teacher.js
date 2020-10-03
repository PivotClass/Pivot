import { RoomService } from "@roomservice/browser";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Transcript from "../Transcript.js"

export default function Teacher(props) {

    // CSS styling
    const styles = {
        container: {
            margin: "0 auto",
            padding: "24px",
            //display: "flex",
            //lexDirection: "column",
            textAlign: "center",
        },
        welcome: {
            margin: "0 auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            fontFamily: "Roboto, sans-serif",
            fontSize: "48px",
        },
        roomID: {
            margin: "0 auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            fontFamily: "Roboto, sans-serif",
            fontSize: "36px",
        },
        widget: {
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "#e8e8e8",
            padding: "10px",
            borderRadius: "10px",
            //boxShadow: "-5px 5px 5px -5px rgba(0, 0, 0, .2)",
        },
        widgetTitle: {
            fontFamily: "Roboto, sans-serif",
            fontSize: "36px",
            padding: "10px 10px 30px 10px",
            fontWeight: "300"
        },
        widgetText: {
            fontFamily: "Roboto, sans-serif",
            fontSize: "22px",
            fontWeight: "300",
        },
        input: {
            display: "block",
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "Roboto, monospace",
            fontSize: "22px",
        },
        answerChoice: {
            display: "block",
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "Roboto, monospace",
            fontSize: "14px",
        },
        pollResponses: {
            fontSize: "18px",
            borderBottom: "1px solid black"
        }
    };


    // useMap hook opens room and associated map object
    function useMap(roomName, mapName) {
        const [map, setMap] = useState();
        useEffect(() => {
            async function load() {
                // calls roomservice client
                const client = new RoomService({
                    auth: "/api/roomservice",
                });

                // creates room from client and map from room
                console.log("Opening room: " + roomName);
                const room = await client.room(roomName);
                const m = await room.map(mapName);
                setMap(m);

                room.subscribe(m, (mp) => {
                    console.log(mp);
                    setMap(mp);
                });
            }

            load()
        }, []);
        return [map, setMap];
    }

    // textboxes for poll question and the single-note
    const [questionTextbox, setQuestionTextbox] = useState("");
    const [singleNoteTextbox, setSingleNoteTextbox] = useState("");

    // bad code, but can't do this in a loop -- React hooks cannot be used in loops, conditionals, etc.
    const choiceList = []
    for (let i = 0; i < 5; i++) {
        choiceList.push(useState(""));
    }


    // initializes map object and setMap method
    const [dataMap, setDataMap] = useMap(props.roomName, "data");

    if (dataMap && !dataMap.get("initialized")) {
        initialize();
    }

    function createPoll(pollName) {
        setDataMap(dataMap.set(pollName, {
            "questionText": "",
            "responseList": [],
            "answerOptions": []
        }));
    }

    // initialize map data types
    function initialize() {
        setDataMap(dataMap.set("initialized", true));
        createPoll("poll");
        setDataMap(dataMap.set("singleNote", ""));
    }

    // sends the poll to the students by updating dataMap
    function sendPoll() {
        if (!dataMap || !dataMap.get("initialized")) return;
        if (questionTextbox == "") {
            alert("please enter a poll question!");
            return;
        }
        const temp = dataMap.get("poll");
        temp["questionText"] = questionTextbox;
        let tempArr = [];
        for (let i = 0; i < 5; i++) {
            if (choiceList[i][0] != "") tempArr.push(choiceList[i][0]);
        }
        temp["answerOptions"] = tempArr.slice();
        setDataMap(dataMap.set("poll", temp));
    }

    // edit FIRST-ORDER map text fields (may come in handy later on)
    function setMapTextField(fieldName, text, setText) {
        setDataMap(dataMap.set(fieldName, text));
        setText("");
    }

    // get the student responses return the JSX
    function responses() {
        if (dataMap && dataMap.get("initialized")) {
            return dataMap.get("poll")["responseList"].map((str, len) => {
                return (<p style={styles.pollResponses} key={len}> {str} </p>);
            });
        }
    }

    // JSX content displayed (mostly self-explanatory)
    return (
        <div style={styles.container}>
            <div>
                <Typography variant="h2" gutterBottom style={styles.welcome}>Welcome, Teacher!
                    <br/>
                    <p style={styles.roomID}>Your room ID is: {props.roomName}</p></Typography>
            </div>
            <div className="App">
                <Transcript />
                <Grid
                    container
                    justify="center"
                    spacing={3}>
                    <Grid item xs={6}>
                        <div style={styles.widget}>
                            <div>
                                <div style={styles.widgetTitle}>Polling</div>
                                <div style={styles.widgetText}>
                                    Enter a poll question:
                                    {" "}
                                    <TextField
                                        id="filled-basic-questionbox"
                                        label="Question"
                                        variant="filled"
                                        fullWidth
                                        style={styles.input}
                                        type="text"
                                        value={questionTextbox}
                                        onChange={(e) => setQuestionTextbox(e.target.value)}
                                        multiline = {true}
                                    />
                                </div>
                                <br/>
                                <br/>
                                <div style={styles.widgetText}>
                                    Enter answer choices:
                                    <p style={{fontSize: "14px"}}>Leave all choices blank for short answer.</p>
                                    <TextField id="filled-basic-choice1" label="1." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceList[0][0]}
                                               onChange={(e) => choiceList[0][1](e.target.value)}
                                    />
                                    <TextField id="filled-basic-choice2" label="2." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceList[1][0]}
                                               onChange={(e) => choiceList[1][1](e.target.value)}
                                    />
                                    <TextField id="filled-basic-choice3" label="3." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceList[2][0]}
                                               onChange={(e) => choiceList[2][1](e.target.value)}
                                    />
                                    <TextField id="filled-basic-choice4" label="4." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceList[3][0]}
                                               onChange={(e) => choiceList[3][1](e.target.value)}
                                    />
                                    <TextField id="filled-basic-choice5" label="5." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceList[4][0]}
                                               onChange={(e) => choiceList[4][1](e.target.value)}
                                    />
                                    <Button
                                        onClick={() => { sendPoll(); }}
                                        size="large" variant="outlined" disableElevation>
                                        Send to Students
                                    </Button>
                                </div>
                                <br/>
                                <div>
                                    <div style={styles.widgetTitle}>Student Results</div> {responses()}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            spacing={2}>
                            <Grid item>
                                <div style={styles.widget}>
                                    <div style={styles.widgetTitle}>Student Questions</div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={styles.widget}>
                                    <div style={styles.widgetTitle}>Important Notes and Links</div>
                                    <div style={styles.widgetText}>
                                        Send something to your students:
                                        {' '}
                                        <TextField
                                            id="filled-basic-notebox"
                                            label="Note"
                                            variant="filled"
                                            fullWidth
                                            style={styles.input}
                                            type="text"
                                            value={singleNoteTextbox}
                                            onChange={(e) => setSingleNoteTextbox(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter" && singleNoteTextbox !== "") {
                                                    setMapTextField("singleNote", singleNoteTextbox, setSingleNoteTextbox);
                                                }
                                            }}
                                        /> You entered: <b>"{(dataMap && dataMap.get("singleNote") ? dataMap.get("singleNote") : "")}"</b>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>

    );
}
