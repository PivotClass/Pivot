import { RoomService } from "@roomservice/browser";
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Student(props) {

    // CSS styling
    const styles = {
        container: {
            margin: "0 auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
        },
        input: {
            // backgroundColor: "#22cfef",
            // padding: "30px 30px",
            // borderRadius: "200px",
            // border: "1px solid black",
            // display: "flex",
            // fontSize: "2em",
            // outline: "none",
            // transition: "all 0.10s",
            // marginBottom: "30px"
            display: "block",
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "Roboto, monospace",
            fontSize: "22px",
        },
        pollResponses: {
            fontSize: "18px",
            borderBottom: "1px solid black"
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
        answerChoice: {
            display: "block",
            margin: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "Roboto, monospace",
            fontSize: "14px",
        },
        transcript: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "#e8e8e8",
            padding: "10px",
            borderRadius: "10px",
            bottom: "10px",
            width: "97%",
            position: "fixed",
            fontSize: "18px",
            fontWeight: "300",
        },
        choiceList: {
            listStylePosition: "inside",
            paddingLeft: "0",
            lineHeight: "140%",
        }
    };
    
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

    const [dataMap, setDataMap] = useMap(props.roomName, "data");

    // generic updating text component
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");

    // called when poll item is clicked
    function onCheckOff(i) {
        if (!dataMap || !dataMap.get("initialized")) return;
        const temp = dataMap.get("poll");
        temp["responseList"].splice(i, 1);
        setDataMap(dataMap.set("poll", temp));
    }

    // called when poll item is entered
    function onEnterPress() {
        if (!dataMap || !dataMap.get("initialized") || dataMap.get("poll")["questionText"] == "") {
            alert("wait for your teacher to send a poll question!");
            return;
        }
        const temp = dataMap.get("poll");
        temp["responseList"].push(answer);
        setDataMap(dataMap.set("poll", temp));
        setAnswer("");
    }

    // edit FIRST-ORDER map text fields (may come in handy later on)
    function setMapTextField(fieldName, text, setText) {
        setDataMap(dataMap.set(fieldName, text));
        setText("");
    }

    return (
        <div style={styles.container}>
            <div>
                <Typography variant="h2" gutterBottom style={styles.welcome}>Welcome, Student!
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
                                    Question: <b><em>{((dataMap && dataMap.get("initialized")) ? dataMap.get("poll")["questionText"] : "")}</em></b>
                                    {/* textbox component */}

                                    <p>{(dataMap && dataMap.get("initialized") && dataMap.get("poll")["answerOptions"].length > 0 ? "Answer Choices:" : "")}</p>
                                    <ol style={styles.choiceList}>
                                        {dataMap && dataMap.get("initialized") &&
                                            dataMap.get("poll")["answerOptions"].map((option, len) => {
                                                return(
                                                    <li id={len} >{option}</li>
                                                );
                                            })}
                                        </ol>
                                        <TextField
                                            id="filled-basic-answerbox"
                                            label="Answer"
                                            variant="filled"
                                            fullWidth
                                            style={styles.input}
                                            type="text"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    onEnterPress();
                                                }
                                            }}
                                        />
                                        {dataMap && dataMap.get("initialized") &&
                                        dataMap.get("poll")["responseList"].map((l, i) => (
                                            <p
                                                style={styles.pollResponses}
                                                key={JSON.stringify(l) + "-" + i}
                                                onClick={() => onCheckOff(i)}
                                            >
                                                {l.object || l}
                                                {/* {"-"} */}
                                                {/* {i} */}
                                            </p>
                                        ))}
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
                                    <div style={styles.widgetTitle}>Questions</div>
                                    <div style={styles.widgetText}>
                                        Send an anonymous question:
                                        <TextField
                                            id="filled-basic-questionbox-student"
                                            label="Question"
                                            variant="filled"
                                            fullWidth
                                            style={styles.input}
                                            type="text"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter" && question !== "") {
                                                    setMapTextField("studentQuestion", question, setQuestion);
                                                }
                                            }}
                                        />
                                        Your question was: <b>"{(dataMap && dataMap.get("studentQuestion") ? dataMap.get("studentQuestion") : "")}"</b>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={styles.widget}>
                                    <div style={styles.widgetTitle}>Important Notes and Links</div>
                                    <div style={styles.widgetText}>
                                        Placeholder
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div style={styles.transcript}>Transcript text</div>
        </div>
        // <div style={styles.container}>
        //     <h1>Room ID: <code>{props.roomName}</code></h1>
        //
        //     <h2>Poll Question: <b><em>{((dataMap && dataMap.get("initialized")) ? dataMap.get("poll")["questionText"] : "")}</em></b></h2>
        //     {/* textbox component */}
        //
        //     {(dataMap && dataMap.get("initialized") && dataMap.get("poll")["answerOptions"].length > 0 ? "Answer Choices:" : "")}
        //     <ol>
        //         {dataMap && dataMap.get("initialized") &&
        //         dataMap.get("poll")["answerOptions"].map((option, len) => {
        //             return(
        //                 <li id={len} >{option}</li>
        //             );
        //         })}
        //     </ol>
        //     <input
        //         style={styles.input}
        //         type="text"
        //         value={text}
        //         onChange={(e) => setText(e.target.value)}
        //         onKeyPress={(e) => {
        //             if (e.key === "Enter") {
        //                 onEnterPress();
        //             }
        //         }}
        //     />
        //     {dataMap && dataMap.get("initialized") &&
        //     dataMap.get("poll")["responseList"].map((l, i) => (
        //         <p
        //             style={styles.pollResponses}
        //             key={JSON.stringify(l) + "-" + i}
        //             onClick={() => onCheckOff(i)}
        //         >
        //             {l.object || l}
        //             {/* {"-"} */}
        //             {/* {i} */}
        //         </p>
        //     ))}
        // </div>
    );
}
