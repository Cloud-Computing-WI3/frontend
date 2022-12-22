import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './MediaCard.css';


import './MediaCard.css';

export default function MediaCard(props) {
    return (
        <Card className="card">
            <CardMedia
                className="cardMedia"
                component="img"
                height="140"
                image={props.urlToImage}
                alt={props.alt}
            />
            <CardContent className="cardContent">
                <Typography className="title" gutterBottom variant="h5" component="h2">
                    {props.title ? props.title : props.author !== "" && props.author !== null ? props.author : "Headline"}
                </Typography>
                <Typography className="description" variant="body2" color="textSecondary" component="p">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions className="cardActions">
                <Button
                    className="primaryLink"
                    component="a"
                    href={props.url}
                    target="_blank"
                    rel="noreferrer"
                    size="small"
                    variant="contained"
                    color="primary"
                >
                    {props.primaryLinkTxt ? props.primaryLinkTxt : "Read Article"}
                </Button>

                <Button
                    component={Link}
                    href={props.secondaryLink ? props.secondaryLink : props.url}
                    size="small"
                >
                    {props.secondaryLinkTxt}
                </Button>
            </CardActions>
        </Card>
    );
}



