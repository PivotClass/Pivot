import { useRouter } from 'next/router'
import { useEffect, useState } from "react";


const styles = {
    invalidText: {
        margin: "0 auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    }
}
// Student screen *without* ID component, loads into room corresponding to randomly generated ID.
const UnlinkedStudent = () => {
    return <h1 style={styles.invalidText}>You have not entered a valid student code.</h1>;
}

export default UnlinkedStudent
