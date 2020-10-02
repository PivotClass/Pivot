import { RoomService } from "@roomservice/browser";
import { useEffect, useState } from "react";

export default function Teacher(props) {

    // CSS styling
    const styles = {
        container: {
            backgroundColor: "#88ddff",
            padding: "10px"
        },
        input: {
            backgroundColor: "pink",
        }
    };
    // calls useList to create a room and list object (and initialize function to set list)
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

    // initializes map object and setMap method
    const [map, setMap] = useMap(props.roomName, "data");

    // called when teacher data is inputted
    function onEnterPress(fieldName, text, setText) {
        if (!map) return;

        setMap(map.set(fieldName, text)); 
        setText("");
        
    }

    if (map) {
        console.log(map.get("pollQuestion"));
        console.log(map.get("importantQuote"));
    }

    return (
        <div style={styles.container}>
            <div> 
            <b>You are teacher.</b>
            </div>
            <br/>
            <div>
                Enter a poll question:
                {" "}
                <input
                    style={styles.input}
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && questionText !== "") {
                            onEnterPress("pollQuestion", questionText, setQuestionText);
                        }
                    }}
                />
                <br/>
                Enter an important quote:
                {' '}
                <input
                    style={styles.input}
                    type="text"
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && quoteText !== "") {
                            onEnterPress("importantQuote", quoteText, setQuoteText);
                        }
                    }}
                />
            </div>
        </div>
        
    );
}
