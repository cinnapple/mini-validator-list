import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/CheckRounded";

const styles = theme =>
  createStyles({
    itemValue: {
      opacity: 0.8,
      textAlign: "right"
    }
  });

type Props = {
  classes?;
  leftPrimaryLabel?: string;
  leftSecondaryLabel?: string;
  rightComponent?: JSX.Element;
  rightPrimaryLabel?: string;
  isChecked?: boolean;
  value?: string;
  onClick?: (value: string) => void;
};

const StackedListItem: React.SFC<Props> = ({
  classes,
  leftPrimaryLabel,
  leftSecondaryLabel,
  rightComponent,
  rightPrimaryLabel,
  onClick,
  value,
  isChecked
}) => {
  let listItemProps = {};
  if (!!onClick) {
    listItemProps = {
      button: true,
      onClick: () => onClick(value)
    };
  }

  return (
    <ListItem {...listItemProps}>
      <ListItemText
        primary={leftPrimaryLabel}
        secondary={leftSecondaryLabel}
        className={classes.itemLabel}
      />
      {rightComponent}
      {rightPrimaryLabel && (
        <ListItemText
          primary={rightPrimaryLabel}
          className={classes.itemValue}
        />
      )}
      {!!isChecked && <CheckIcon color="action" />}
    </ListItem>
  );
};

export default withStyles(styles)(StackedListItem);
