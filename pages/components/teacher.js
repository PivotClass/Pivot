import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "./Cards";


// Example card list that is loaded on components/student.
const exampleCardList = [
    {
        type: "poll",
        mcq: true,
        question: "Chicago is a...",
        choices: ["City", "Country", "State", "Town", "Continent"],
    },
    {
        type: "poll",
        mcq: false,
        question: "Fill in what Chicago is!"
    },
    {
        type: "studentQuestion",
    },
    {
        type: "tooltip",
        title: "Derivative",
        content: "A derivative is the infinitesimal rate of change in a function with respect to one of its parameters."
    },
    {
        type: "tooltip",
        title: "l'Hôpital's rule",
        subtitle: "(mathematical problem)",
        content: "Suppose that lim(f(x)) and lim(g(x)) are both zero or both ±∞. Then l'Hôpital's rule states that if lim(f'(x)/(g'(x))) has a finite limit or the limit is ±∞, then lim(f(x)/(g(x))) = lim(f'(x)/(g'(x)))."
    },
    {
        type: "teacherPoll"
    },
    {
        type: "publicQuestion",
        title: "Who is a derivative?",
        answered: false
    }
]





// Student feed.
export default function TeacherClient(props) {
    function useList(roomName, listName) {
        const [list, setList] = useState();
        useEffect(() => {
            async function load() {
                // calls roomservice client
                const client = new RoomService({
                    auth: "/api/roomservice",
                });
    
                // creates room from client and map from room
                console.log("Opening room: " + roomName);
                const room = await client.room(roomName);
                const l = await room.map(listName);
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
    
    // const [cardList, setCardList] = useList(11223344, "cards");

    // if (cardList) setCardList(cardList.push("hello"));

    // console.log(cardList);





    return (
        <Cards cardList={exampleCardList} teacher />
    );
}
