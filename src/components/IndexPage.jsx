import React from "react";
import Highlighter from "react-highlight-words";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";

import data from "./dict.json";

// import styles
import "../css/TextField.css";

let dictArray = [];
let categories = [];

// const dictionary =
//   '{"colours": ["red", "yellow","pink", "green", "blue", "purple", "brown", "black", "white"], "names": ["fred", "jonathan","simon","georgia","sahil"],"animals":["cat","dog","elephant","giraffe","fox"]}';

class IndexPage extends React.Component {
  state = {
    textBoxContents: "",
    textBoxContentsArray: [],
    words: ["default", "words"],
    categories: [],
    categoriesToDisplay: [],
    showColourResult: false,
    showAnimalResult: false,
    showNameResult: false
  };

  componentDidMount = () => {
    let tempWordArray = [];
    let wordArray = [];

    Object.entries(data).forEach(entry => {
      entry[1].forEach(value => {
        tempWordArray.push(value);
        wordArray = tempWordArray.slice(0);
        this.setState({ words: wordArray });
      });
    });

    Object.keys(data).forEach(key => {
      dictArray.push(key);
      categories = dictArray.slice();
      this.setState({
        categories: categories
      });
    });
  };

  handleChange = () => event => {
    this.setState({
      textBoxContents: event.target.value
    });

    let tempMatchedCategoriesArray = [];
    let textBoxContentString = this.state.textBoxContents.toString();

    if (textBoxContentString === null || textBoxContentString === "") {
      console.log("Please enter something in the text box");
      return;
    }
    const textBoxWordArray = textBoxContentString.split(" ");
    this.setState({ textBoxContentsArray: textBoxWordArray });

    if (
      this.state.textBoxContentsArray !== [] &&
      this.state.words !== ["default", "words"]
    ) {
      const intersection = this.state.textBoxContentsArray.filter(element =>
        this.state.words.includes(element)
      );

      Object.entries(data).forEach(entry => {
        intersection.forEach(matchingWord => {
          if (entry[1].includes(matchingWord)) {
            tempMatchedCategoriesArray.push(entry[0]);
            this.setState({
              categoriesToDisplay: tempMatchedCategoriesArray
            });
          }
        });
      });
    }
  };

  render() {
    let elements = this.state.categoriesToDisplay.map(item => (
      <Chip label={item} key={item} />
    ));

    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        alignContent="stretch"
        spacing={10}
        className="gridClass"
      >
        <Grid item>
          <Paper className="paperContainer">
            <Grid item xs={12} sm={12}>
              <Typography variant="h5" component="h3" className="title">
                Risk POC
              </Typography>
              <Divider className="titleDivider" />
              <Typography component="p" className="typoText">
                Enter text in the below field to highlight themes and categories
                that match the supplied dictionary
              </Typography>
              <TextField
                label="Paste text here"
                className="inputTextField"
                onChange={this.handleChange()}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item>
              <Grid item xs={12} sm={12}>
                <Typography component="p" className="highlightedTextHelper">
                  Text matching dictionary words appear highlighted below
                </Typography>
                <Highlighter
                  className="highlighter"
                  searchWords={this.state.words}
                  textToHighlight={this.state.textBoxContents}
                />
              </Grid>
              <Grid item className="chipGrid">
                <React.Fragment>{elements}</React.Fragment>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default IndexPage;
