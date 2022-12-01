import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function MediaCard(props) {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={props.urlToImage}
                alt={props.alt}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.author !== "" && props.author !== null ? props.author : props.source.name !== "" && props.source.name !== null ? props.source.name : props.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    href={props.primaryLink ? props.primaryLink : props.url}
                    size="small">{props.primaryLinkTxt ? props.primaryLinkTxt : "Read Article"}
                </Button>
                <Button
                    component={Link}
                    href={props.secondaryLink}
                    size="small">{props.secondaryLinkTxt}
                </Button>
            </CardActions>
        </Card>
    );
}