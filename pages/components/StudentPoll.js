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
import { sizing } from '@material-ui/system';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: "100%",
        backgroundColor: "lightcyan",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        fontSize: 12,
        marginBottom: 12,
    },
});

export default function StudentPoll() {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined" width="100%">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Instructor Poll
                </Typography>
                <Typography variant="h5" component="h2">
                    Chicago is a?
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    multiple choice question
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <LensIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText
                            primary="City"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" size="small">
                                <SpaIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText
                            primary="Country"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <StarIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText
                            primary="State"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <HourglassFullIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText
                            primary="Town"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <IconButton aria-label="delete" color="primary" size="small">
                                <WbCloudyIcon />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText
                            primary="Continent"
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}