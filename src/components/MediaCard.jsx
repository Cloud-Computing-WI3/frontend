import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={props.imgSrc}
                alt={props.alt}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.headline}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.extract}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    href={props.primaryLink}
                    size="small">{props.primaryLinkTxt}
                </Button>
                <Button
                    href={props.secondaryLink}
                    size="small">{props.secondaryLinkTxt}
                </Button>
            </CardActions>
        </Card>
    );
}