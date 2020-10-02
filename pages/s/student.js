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

    // initialize map object and setMap function
    const [dataMap, setMap] = useMap(props.roomName, "data");
    const [pollAnswers, setPollAnswers] = useList(props.roomName, "poll");


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

    // generic updating text component
    const [text, setText] = useState("");

    // called when poll item is clicked
    function onCheckOff(i) {
        if (!dataMap || !dataMap.get("pollResponses")) return;
        const temp = dataMap.get("pollResponses");
        temp.splice(i, 1);
        setMap(dataMap.set("pollResponses", temp));
    }

    // called when poll item is entered
    function onEnterPress() {
        if (!dataMap || !dataMap.get("pollResponses")) return;
        const temp = dataMap.get("pollResponses");
        temp.push(text);
        setMap(dataMap.set("pollResponses", temp));
        setText("");
    }

    return (
        <div style={styles.container}>
            <h1>Room ID: <code>{props.roomName}</code></h1>
            <h2>Quote of the Day: {' '}
            <em>
                "{(dataMap && dataMap.get("importantQuote") ? dataMap.get("importantQuote") : "")}"
            </em>
            </h2>

            <h2>Poll Responses</h2>
            <p><b>(Professor: "{((dataMap && dataMap.get("pollQuestion")) ? dataMap.get("pollQuestion") : "")}")</b></p>
            {/* textbox component */}
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
            {dataMap && dataMap.get("pollResponses") && 
            dataMap.get("pollResponses").map((l, i) => (
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
