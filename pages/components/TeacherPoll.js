import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import LensIcon from '@material-ui/icons/Lens';
import SpaIcon from '@material-ui/icons/Spa';
import StarIcon from '@material-ui/icons/Star';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        width: "100%",
        backgroundColor: "lightcyan",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        fontSize: 10,
        marginBottom: 12,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function TeacherPoll() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined" width="100%">
            <CardContent>
                <TextField
                    id="filled-basic-questionbox"
                    label="Instructor Question"
                    variant="outlined"
                    fullWidth
                    // style={styles.input}
                    type="text"
                    // value={questionTextbox}
                    // onChange={(e) => setQuestionTextbox(e.target.value)}
                    multiline={true}
                    margin={"normal"}
                />
                <Typography className={classes.pos} color="textSecondary">
                    Leave all answer choices blank to pose this as a free-response question.
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <LensIcon/>
                            </IconButton>
                        </ListItemIcon>
                        <TextField
                            id="filled-basic-questionbox"
                            label="Choice A"
                            variant="outlined"
                            size={"small"}
                            fullWidth
                            // style={styles.input}
                            type="text"
                            // value={questionTextbox}
                            // onChange={(e) => setQuestionTextbox(e.target.value)}
                            multiline={false}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" size="small">
                                <SpaIcon/>
                            </IconButton>
                        </ListItemIcon>
                        <TextField
                            id="filled-basic-questionbox"
                            label="Choice B"
                            variant="outlined"
                            size={"small"}
                            fullWidth
                            // style={styles.input}
                            type="text"
                            // value={questionTextbox}
                            // onChange={(e) => setQuestionTextbox(e.target.value)}
                            multiline={false}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <StarIcon/>
                            </IconButton>
                        </ListItemIcon>
                        <TextField
                            id="filled-basic-questionbox"
                            label="Choice C"
                            variant="outlined"
                            size={"small"}
                            fullWidth
                            // style={styles.input}
                            type="text"
                            // value={questionTextbox}
                            // onChange={(e) => setQuestionTextbox(e.target.value)}
                            multiline={false}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <HourglassFullIcon/>
                            </IconButton>
                        </ListItemIcon>
                        <TextField
                            id="filled-basic-questionbox"
                            label="Choice D"
                            variant="outlined"
                            size={"small"}
                            fullWidth
                            // style={styles.input}
                            type="text"
                            // value={questionTextbox}
                            // onChange={(e) => setQuestionTextbox(e.target.value)}
                            multiline={false}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <WbCloudyIcon/>
                            </IconButton>
                        </ListItemIcon>
                        <TextField
                            id="filled-basic-questionbox"
                            label="Choice E"
                            variant="outlined"
                            size={"small"}
                            fullWidth
                            // style={styles.input}
                            type="text"
                            // value={questionTextbox}
                            // onChange={(e) => setQuestionTextbox(e.target.value)}
                            multiline={false}
                        />
                    </ListItem>
                </List>
            </CardContent>
            <Divider variant="middle"/>
            <CardActions>
                <Button variant="outlined" color="primary" className={classes.button}>
                    Poll Students
                </Button>
            </CardActions>
        </Card>
    );
}