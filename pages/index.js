import Link from 'next/link'
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FaceIcon from '@material-ui/icons/Face';
import MicIcon from '@material-ui/icons/Mic';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function Home() {

    const classes = useStyles();

    const [studentCode, setStudentCode] = useState("");

    const [errorOpen, setErrorOpen] = React.useState(false);

    const handleErrorClick = () => {
        setErrorOpen(true);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    };

    const styles = {
        container: {
            margin: "0 auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
        },
        h1: {
            position: "absolute",
            textAlign: "center",
            width: "100%",
            top: "10%",
        },
        button: {
            display: "inline-block",
            padding: "0.35em 1.2em",
            border: "0.1em solid #FFFFFF",
            margin: "0 0.2em 0.2em 0",
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
        text: {
            fontFamily: "Roboto, sans-serif",
            fontSize: "36px",
            fontWeight: "100",
        },
        codeInput: {
            fontFamily: "Roboto, monospace",
            fontSize: "38px",
            fontWeight: "100",
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "10px",
            width: "180.641px",
        },
        buttonContainer: {
            background: "transparent",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            flexWrap: "wrap",
            width: "80%",
            height: "30%",
            position: "absolute",
            top: "35%",
            left: "10%",
        },
    };

    // checks if code is of valid format (NOT YET CHECKING DUPLICATE ROOMS) before redirecting to avoid arbitrary file access
    function isValid(code) {
        let codeExp = /^[a-z0-9]{4}$/;
        return codeExp.test(code);
    }

    return (
        <div style={styles.container}>
            <Typography variant="h2" gutterBottom style={styles.h1}>Welcome to Pivot!</Typography>
            <div style={styles.buttonContainer}>
                <div>
                    <div className="dropdownDiv">
                        <Link href='/t/'>
                            <Tooltip title="Create a new teacher room">
                                <Button
                                    size="large" variant="outlined" color="primary" disableElevation
                                    endIcon={<MicIcon/>}>
                                    I'm a teacher
                                </Button>
                            </Tooltip>
                        </Link>
                    </div>
                </div>
                <div>
                    <form>
                        <Typography variant="button" display="block">
                            My room code is:
                        </Typography>
                        <TextField
                            id="outlined-search"
                            type="text"
                            variant="outlined"
                            InputProps={{
                                style: styles.codeInput,
                            }}
                            value={studentCode}
                            error={errorOpen}
                            onChange={(e) => {
                                setStudentCode(e.target.value);
                                if (!isValid(e.target.value)) {
                                    handleErrorClick();
                                } else {
                                    handleErrorClose();
                                }
                            }
                            }/>
                        <div className="dropdownDiv">
                            <Link href={"/s/" + (isValid(studentCode) ? studentCode : "")} passHref>
                                <Tooltip title="Join a student room">
                                    <Button
                                        size="large" variant="outlined" color="secondary" disableElevation
                                        endIcon={<FaceIcon/>}
                                        type="submit">
                                        I'm a student
                                    </Button>
                                </Tooltip>
                            </Link>
                        </div>
                    </form>
                </div>
                <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error">Your code is currently invalid!</Alert>
                </Snackbar>
            </div>
        </div>
    )
}