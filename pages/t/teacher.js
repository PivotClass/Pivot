import { RoomService } from "@roomservice/browser";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
        }
    };

    // demonstrates roomservice list feature by creating a room and list object
    function useList(roomName, listName) {
        const [list, setList] = useState();

        useEffect(() => {
            async function load() {
                // calls roomservice client
                const client = new RoomService({
                    auth: "/api/roomservice",
                });

                // creates room from client and list from room
                console.log("Opening room: " + roomName);
                const room = await client.room(roomName);
                const l = await room.list(listName);
                setList(l);

                room.subscribe(l, (li) => {
                    console.log(li);
                    setList(li);
                });
            }

            load()
        }, []);
        return [list, setList];
    }

    // demonstrates roomservice map feature by creating a room and map object
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


    function updateListByID() {
        [list, setList] = useList(props.roomName, "polls");
    }

    // two different text objects for two different textbooks
    const [questionText, setQuestionText] = useState("");
    const [quoteText, setQuoteText] = useState("");
    const [choiceOne, setChoiceOne] = useState("");
    const [choiceTwo, setChoiceTwo] = useState("");
    const [choiceThree, setChoiceThree] = useState("");
    const [choiceFour, setChoiceFour] = useState("");
    const [choiceFive, setChoiceFive] = useState("");

    // initializes map object and setMap method
    const [dataMap, setMap] = useMap(props.roomName, "data");


    if (dataMap && !dataMap.get("pollResponses")) {
        setMap(dataMap.set("pollResponses", []));
        console.log("SETTING MAP HERE!");
    }

    // called when teacher data is inputted
    function onEnterPress(fieldName, text, setText) {
        if (!dataMap) return;

        setMap(dataMap.set(fieldName, text));
        setText("");

    }

    if (dataMap) {
        console.log(dataMap.get("pollQuestion"));
        console.log(dataMap.get("importantQuote"));
    }

    function responses() {
        if (dataMap && dataMap.get("pollResponses") && typeof dataMap.get("pollResponses") === "object") {
            console.log(dataMap.get("pollResponses"));
            return dataMap.get("pollResponses").map(str => {
                return (<li key={JSON.stringify(str) + "-" + Math.random()}> {str} </li>);
            });
        }
    }

    return (
        <div style={styles.container}>
            <div>
                <Typography variant="h2" gutterBottom style={styles.welcome}>Welcome, Teacher!
                    <br/>
                    <p style={styles.roomID}>Your room ID is: {props.roomName}</p></Typography>
            </div>
            <div className="App">
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
                                        id="filled-basic"
                                        label="Question"
                                        variant="filled"
                                        fullWidth
                                        style={styles.input}
                                        type="text"
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" && questionText !== "") {
                                                onEnterPress("pollQuestion", questionText, setQuestionText);
                                            }
                                        }}
                                    /> You entered: <b>"{(dataMap && dataMap.get("pollQuestion") ? dataMap.get("pollQuestion") : "")}"</b>
                                </div>
                                <br/>
                                <br/>
                                <div style={styles.widgetText}>
                                    Enter answer choices:
                                    <p style={{fontSize: "14px"}}>Leave all choices blank for short answer.</p>
                                    <TextField id="filled-basic" label="1." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceOne}
                                               onChange={(e) => setChoiceOne(e.target.value)}
                                    />
                                    <TextField id="filled-basic" label="2." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceTwo}
                                               onChange={(e) => setChoiceTwo(e.target.value)}
                                    />
                                    <TextField id="filled-basic" label="3." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceThree}
                                               onChange={(e) => setChoiceThree(e.target.value)}
                                    />
                                    <TextField id="filled-basic" label="4." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceFour}
                                               onChange={(e) => setChoiceFour(e.target.value)}
                                    />
                                    <TextField id="filled-basic" label="5." variant="filled" fullWidth size="small"
                                               style={styles.answerChoice} type="text" value={choiceFive}
                                               onChange={(e) => setChoiceFive(e.target.value)}
                                    />
                                    <Button
                                        size="large" variant="outlined" disableElevation>
                                        Send to Students
                                    </Button>
                                </div>
                                <br/>
                                <div>
                                    <div style={styles.widgetTitle}>Student Results</div>
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
                                            id="filled-basic"
                                            label="Note"
                                            variant="filled"
                                            fullWidth
                                            style={styles.input}
                                            type="text"
                                            value={quoteText}
                                            onChange={(e) => setQuoteText(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter" && quoteText !== "") {
                                                    onEnterPress("importantQuote", quoteText, setQuoteText);
                                                }
                                            }}
                                        /> You entered: <b>"{(dataMap && dataMap.get("importantQuote") ? dataMap.get("importantQuote") : "")}"</b>
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
