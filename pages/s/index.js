import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const styles = {
    container: {
        margin: "0 auto",
        padding: "24px",
        //display: "flex",
        //lexDirection: "column",
        textAlign: "center",
    },
    invalidText: {
        margin: "0 auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: "24px",
    }
}
// Student screen *without* ID component, loads into room corresponding to randomly generated ID.
const UnlinkedStudent = () => {
    //return <h1 style={styles.invalidText}>You have not entered a valid student code.</h1>;
    return (
        <div style={styles.container}>
            <Typography variant="h2" gutterBottom style={styles.invalidText}>You have not entered a valid student code.</Typography>
            <Link href='/'>
                <Button
                    size="large" variant="outlined" color="secondary" disableElevation>
                    Back
                </Button>
            </Link>
        </div>
    )
}

export default UnlinkedStudent
