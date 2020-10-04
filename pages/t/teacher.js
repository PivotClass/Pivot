import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "../components/Cards";


// Example card list that is loaded on components/student.
const exampleCardList = [
    {
        type: "poll",
        mcq: true,
        question: "Chicago is a...",
        choices: ["City", "Country", "State", "Town", "Continent"],
        answers: ["City", "Country", "State", "Town", "Town", "Town"]
    },
    {
        type: "poll",
        mcq: false,
        question: "Fill in what Chicago is!",
        answers: ["idk", "something", "big", "no u"]
    },
    {
        type: "studentQuestion",
        answers: []
    },
    {
        type: "tooltip",
        title: "Derivative",
        content: "A derivative is the infinitesimal rate of change in a function with respect to one of its parameters."
    },
    {
        type: "tooltip-creator"
    },
    {
        type: "teacherPoll"
    },
    {
        type: "publicQuestion",
        title: "Who is a derivative?",
        answered: false,
        id: "83"
    }
].reverse();




// Student feed.
export default function TeacherClient(props) {
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
            setList(l);
      
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
    
    const [cardList, setCardList] = useList(props.roomName, "cards");

    // function pushCard(keyValArray) { 
    //     if (!cardList) return;
    //     // example: pushPoll([(type, "studentPoll"), (question, "how are you?"), etc.])
    //     const cardStruct = {};
    //     for (let kvPair in keyValArray) {
    //         const [key, val] = kvPair;
    //         cardStruct[key] = val;
    //     }
    //     console.log("struct:" + cardStruct);
    //     // setCardList(cardList.push(cardStruct));
    // } 

    // function pushPoll(mcqVal, questionVal, choicesVal=null) {
    //     pushCard([['mcq', mcqVal], ['question', questionVal], ['choices', choicesVal]]);
    // }

    
    function initialize() {
        for (let i = 0; i < exampleCardList.length; i++) {
            setCardList(cardList.push(exampleCardList[i]));
        }
    }
    
    
    if (cardList && cardList.toArray().length == 0) {
        initialize();   
    }



    cardList && console.log(cardList.toArray());

    function clearCardList() {
        if (!cardList) return;
        while (cardList.toArray().length > 0) {
            setCardList(cardList.delete(0));
        }
    }





    return (
        <Cards teacherView={true} roomName={props.roomName} listName = "cards" cardList={(cardList ? cardList.toArray().reverse() : null)} teacher />
    );
}
