import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import * as Autosuggest from "react-autosuggest";
import * as match from "autosuggest-highlight/match";
import * as parse from "autosuggest-highlight/parse";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";

function renderInput(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      style={{ width: "100%" }}
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        disableUnderline: true,
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.domain, query);
  const parts = parse(suggestion.domain, matches);

  return (
    <MenuItem selected={isHighlighted} component="div" style={{ zIndex: 1300 }}>
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.domain;
}

function getSuggestions(value, list) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  const filered =
    inputLength === 0
      ? []
      : list.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.domain &&
            suggestion.domain.toLowerCase().indexOf(inputValue) >= 0;

          if (keep) {
            count += 1;
          }

          return keep;
        });

  return filered;
}

const styles = theme =>
  createStyles({
    input: {},
    suggestion: {
      display: "block"
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: "none"
    }
  });

class IntegrationAutosuggest extends React.Component<any, any> {
  private popperNode: any;
  state = {
    suggestions: this.props.list
  };

  handleSuggestionsFetchRequested = ({ value }, callback) => {
    this.setState(state => ({
      suggestions: getSuggestions(value, this.props.list)
    }));
  };

  handleSuggestionsClearRequested = callback => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.props.handleFilterChange(newValue);
  };

  render = () => {
    const {
      classes,
      handleFilterChange,
      label,
      placeholder,
      value
    } = this.props;
    const { suggestions } = this.state;

    if (!suggestions) {
      return <React.Fragment />;
    }

    return (
      <Autosuggest
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={e =>
          this.handleSuggestionsFetchRequested(e, handleFilterChange)
        }
        onSuggestionsClearRequested={() =>
          this.handleSuggestionsClearRequested(handleFilterChange)
        }
        renderSuggestionsContainer={options => (
          <Popper
            anchorEl={this.popperNode}
            open={Boolean(options.children)}
            style={{ zIndex: 1100 }}
          >
            <Paper
              square
              {...options.containerProps}
              style={{
                width: this.popperNode ? this.popperNode.clientWidth : null
              }}
            >
              {options.children}
            </Paper>
          </Popper>
        )}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: placeholder,
          value: value,
          onChange: this.handleChange,
          label: label,
          inputRef: node => {
            this.popperNode = node;
          },
          InputLabelProps: {
            shrink: true
          }
        }}
      />
    );
  };
}

export default withStyles(styles)(IntegrationAutosuggest);
