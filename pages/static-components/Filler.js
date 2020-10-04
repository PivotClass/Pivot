import React from 'react';
import { Gradient } from 'react-gradient';
import Typography from '@material-ui/core/Typography';
import { StylesProvider } from '@material-ui/core/styles'

// Gradient colors
const gradients = [
    ['#56ab2f', '#a8e063'],
    ['#a8e063', '#56ab2f'],
];

export default function Home() {
    return (
        <StylesProvider>
            <Gradient
                gradients={gradients}
                property="background"
                duration={3000}
                angle="45deg"
                style={{
                    position: "absolute",
                    left: "0",
                    right: "0",
                    top: "0",
                    bottom: "0",
                }}
            >
                <Typography
                    variant="h6"
                    style={{
                        display: "flex",
                        padding: "70px",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                        color: "white",
                    }}
                    gutterBottom>
                    Place your Zoom/teleconferencing software window here.
                </Typography>
            </Gradient>
        </StylesProvider>
    )
}