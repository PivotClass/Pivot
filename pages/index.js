import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import React from 'react';

export default function Home() {

    const [studentCode, setStudentCode] = useState("");

    const styles = {
        container: {
            margin: "0 auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
        },
        h1: {
            fontFamily: "'Roboto',sans-serif",
            fontWeight: "300",
            fontSize: "50px",
        },
        button: {
            display: "inline-block",
            padding: "0.35em 1.2em",
            border: "0.1em solid #FFFFFF",
            margin: "0 0.3em 0.3em 0",
            borderRadius: "0.12em",
            boxSizing: "border-box",
            textDecoration: "none",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            fontSize: "36px",
            color: "#000000",
            textAlign: "center",
            transition: "all 0.2s",
            flexDirection: "row",
            cursor: "pointer",
        },
        dropdownDiv: {
            position: "relative",
            display: "inline-block",
        },
        halfleft: {
            width: "50%",
            position: "fixed",
            zIndex: "1",
            top: "40%",
            overflowX: "hidden",
            paddingTop: "20px",
            left: "0",
        },
        halfright: {
            width: "50%",
            position: "fixed",
            zIndex: "1",
            top: "17.9%",
            overflowX: "hidden",
            paddingTop: "20px",
            right: "0",
        },
        text: {
            fontFamily: "Roboto, sans-serif",
            fontSize: "36px",
            fontWeight: "100",
        },
        code: {
            background: "transparent",
            border: "none",
            borderBottom: "1px solid #000000",
            fontFamily: "Roboto, monospace",
            fontSize: "36px",
            fontWeight: "100",
            outline: "none",
            textAlign: "center",
            paddingBottom: "10px",
            marginBottom: "30px",
        },
    };

    // checks if code is of valid format (NOT YET CHECKING DUPLICATE ROOMS) before redirecting to avoid arbitrary file access
    function isValid(code) {
        let codeExp = /^[a-z0-9]{4}$/;
        return codeExp.test(code); 
    }
    // console.log("T --" + isValid("0000"));
    // console.log("T --" + isValid("a19z"));
    // console.log("T --" + isValid("abcd"));
    // console.log("F --" + isValid("A2js"));
    // console.log("F --" + isValid("a20md"));
    // console.log("F --" + isValid("a2d"));

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Welcome to Pivot!</h1>

            <div style={styles.halfleft}>
                <div className="dropdownDiv">
                    <Link href='/t/'>
                        <button
                        style={styles.button}>
                            I'm a teacher
                        </button>
                    </Link>
                </div>
            </div>
            <div style={styles.halfright}>
                <form>
                    <p style={styles.text}>My code is: </p>
                    <input
                        style={styles.code}
                        type="text"
                        value={studentCode}
                        onChange={(e) => setStudentCode(e.target.value)}
                    />
                    <div className="dropdownDiv">
                        <Link href={"/s/" + (isValid(studentCode) ? studentCode : "")} passHref>
                            <button
                            style={styles.button}
                            type="submit"
                            >
                                I'm a student
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}