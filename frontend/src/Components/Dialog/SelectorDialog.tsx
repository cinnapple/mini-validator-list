import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import GenericDialog from "./GenericDialog";
import GenericList from "../Common/GenericList";
import StackedListItem from "../Common/StackedListItem";

const styles = theme => createStyles({});

const SelectorDialog = ({ dia, onSelect, onClose }) =>
  dia.items ? (
    <GenericDialog title={dia.title} open={dia.open} onClose={onClose}>
      <GenericList>
        {dia.items ? (
          dia.items.map((item, i) => (
            <StackedListItem
              key={i}
              leftPrimaryLabel={item.primaryLabel}
              isChecked={item.value === dia.selectedValue}
              value={item.value}
              onClick={onSelect}
            />
          ))
        ) : (
          <React.Fragment />
        )}
      </GenericList>
    </GenericDialog>
  ) : (
    <React.Fragment />
  );

export default withStyles(styles)(SelectorDialog);
