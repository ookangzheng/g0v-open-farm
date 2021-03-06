import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Chart from "./Chart";
const styles = {
  root: {
    overflow: "hidden"
  },
  title: {
    zIndex: 10,
    position: "absolute",
    top: 10,
    left: 50,
    backgroundColor: "#fbe9a9",
    color: "#464335",
    fontWeight: "bold",
    background: "black"
  },
  media: {
    objectFit: "cover",
    opacity: ".5",
    height: "190px"
  },
  wrap: {
    display: "flex",
    marginTop: "10px",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "10px",
    height: "auto",
    flexGrow: 1
  },
  card: {
    maxWidth: "180px",
    margin: "5px"
  },
  contentImg: {
    height: "80px"
  },
  fab: {
    position: "absolute",
    zIndex: "22",
    marginLeft: "-50%",
    right: "10px",
    top: "16vh"
  },
  back: {
    position: "absolute",
    backgroundColor: "#433b37",
    zIndex: "20",
    top: "7vh",
    left: "5px",
    boxShadow: "1px 2px #888888"
  },
  chart: {
    height: "100vw",
    maxHeight: "50vh"
  }
};

const showList = [
  "avg_total_growing_days",
  "min_growing_temperature",
  "height",
  "min_pH",
  "max_pH",
  "variety"
];
const icons = [
  "https://static.thenounproject.com/png/81677-200.png",
  "https://static.thenounproject.com/png/1979336-200.png",
  "https://static.thenounproject.com/png/434088-200.png",
  "https://static.thenounproject.com/png/1882074-200.png",
  "https://static.thenounproject.com/png/1118764-200.png",
  "https://static.thenounproject.com/png/61962-200.png"
];
const units = ["days", "\u2103", "cm", "ph", "ph", ""];
class Content extends Component {
  constructor(props) {
    super(props);
    let { location } = this.props;
    let vegatable = location
      ? location.hasOwnProperty("state")
        ? location.state
        : null
      : null;
    this.vege = {
      vegatable: vegatable
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    // this.props.store.setLoadingState(false);
  };

  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    const { vegatable } = this.vege;
    console.log(vegatable);
    console.log(this.state);

    return (
      <div className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            // alt={`${vegatable.name}`}
            className={classes.media}
            image={`${vegatable.cover}`}
            // title={`${vegatable.name}`}
          />
          <Typography variant="h5" component="h2" className={classes.title}>
            {`${vegatable.name}`}
          </Typography>
        </CardActionArea>

        <Link to="/category">
          <Fab className={classes.back}>
            <ChevronLeftIcon style={{ color: "white" }} />
          </Fab>
        </Link>

        <Fab className={classes.fab}>
          <img
            style={{ height: "40px" }}
            src="https://static.thenounproject.com/png/61962-200.png"
            alt={"default"}
          />
        </Fab>

        <div className={classes.wrap}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab
                label="細項"
                style={{
                  color: "#fbe9a9",
                  backgroundColor: "#464335",
                  width: "49vw"
                }}
              />
              <Tab
                label="營養"
                style={{
                  color: "#fbe9a9",
                  backgroundColor: "#464335",
                  width: "49vw"
                }}
              />
            </Tabs>
          </AppBar>
          {this.state.value === 0 && (
            <React.Fragment>
              {showList.map((x, i) => {
                return vegatable.hasOwnProperty(`${x}`) &&
                  vegatable[`${x}`] !== null &&
                  vegatable[`${x}`] !== "" ? (
                  <Card key={i} className={classes.card}>
                    <CardActionArea>
                      <Link to={`/${x}`}>
                        <CardContent>
                          <Typography component="h1">
                            <img
                              className={classes.contentImg}
                              src={`${icons[i]}`}
                              alt={`${x}`}
                            />
                          </Typography>
                          <Typography
                            component="p"
                            style={{ textAlign: "center" }}
                          >
                            {`${vegatable[`${x}`]} ${units[i]}`}
                          </Typography>
                        </CardContent>
                      </Link>
                    </CardActionArea>
                  </Card>
                ) : (
                  ""
                );
              })}
              {checkShowList(vegatable) && <span>No data</span>}
            </React.Fragment>
          )}
          {this.state.value === 1 && (
            <Grid container spacing={8} className={classes.chart}>
              <Chart />
            </Grid>
          )}
        </div>
      </div>
    );
  }
}
/**
 * @description checkShowList
 *
 * @param {object} vegatable
 */
const checkShowList = vegatable => {
  let checkedNum = 0;
  showList.forEach(checkedItem => {
    if (
      vegatable.hasOwnProperty(`${checkedItem}`) &&
      vegatable[`${checkedItem}`] != "" &&
      vegatable[`${checkedItem}`] != null
    ) {
      checkedNum++;
    }
  });
  return checkedNum === 0;
};
Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
