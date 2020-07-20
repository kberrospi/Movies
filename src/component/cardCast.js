import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 140,
    height: 320,
  },
  media: {
    height: 175,
    width: 140,
    // 16:9
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          alt={props.name}
          height="140"
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="p">
            <font className="font-weight-bold">{props.name}</font>
          </Typography>
          <Typography variant="inherit" color="textSecondary" component="p">
            {props.character}
          </Typography>
        </CardContent>
    </Card>
     
  );
}

