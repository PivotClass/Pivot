import React from 'react';
import Cards from "./Cards"

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
export default function TeacherClient() {
    return (
        <Cards cardList={exampleCardList} teacher />
    );
}
