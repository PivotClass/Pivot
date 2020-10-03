import { RoomService } from "@roomservice/browser";
import { useEffect, useState } from "react";

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
            backgroundColor: "#22cfef",
            padding: "30px 30px",
            borderRadius: "200px",
            border: "1px solid black",
            display: "flex",
            fontSize: "2em",
            outline: "none",
            transition: "all 0.10s",
            marginBottom: "30px"
        },
        pollResponses: {
            fontSize: "18px",
            borderBottom: "1px solid black"
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
    const [text, setText] = useState("");

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
        temp["responseList"].push(text);
        setDataMap(dataMap.set("poll", temp));
        setText("");
    }

    return (
        <div style={styles.container}>
            <h1>Room ID: <code>{props.roomName}</code></h1>

            <h2>Poll Question: <b><em>{((dataMap && dataMap.get("initialized")) ? dataMap.get("poll")["questionText"] : "")}</em></b></h2>
            {/* textbox component */}

            {(dataMap && dataMap.get("initialized") && dataMap.get("poll")["answerOptions"].length > 0 ? "Answer Choices:" : "")}
            <ol>
                {dataMap && dataMap.get("initialized") && 
                dataMap.get("poll")["answerOptions"].map((option, len) => {
                    return(
                        <li id={len} >{option}</li>
                    );
                })}
            </ol>
            <input
                style={styles.input}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
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
    );
}
