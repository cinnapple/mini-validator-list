import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";

const styles = theme =>
  createStyles({
    root: {},
    button: {
      color: theme.palette.secondary.main
    }
  });

type Props = {
  buttonText: string;
  onClick: any;
  disabled: boolean;
  classes?: any;
  className?: string;
};

const MyButton: React.SFC<Props> = ({
  classes,
  buttonText,
  onClick,
  disabled,
  className
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={className || classes.button}
      size="small"
    >
      {buttonText}
    </Button>
  );
};

export default withStyles(styles)(MyButton);
