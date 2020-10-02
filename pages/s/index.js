import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

// Student screen *without* ID component, loads into room corresponding to randomly generated ID.
const UnlinkedStudent = () => {
    return <h1>You have not entered a student code.</h1>;
}

export default UnlinkedStudent
