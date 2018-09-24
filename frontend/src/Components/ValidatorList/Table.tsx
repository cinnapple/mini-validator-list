import * as React from "react";
import { WindowScroller } from "react-virtualized/dist/es/WindowScroller";
import { AutoSizer } from "react-virtualized/dist/es/AutoSizer";
import { List } from "react-virtualized/dist/es/List";

import {
  withStyles,
  createStyles,
  WithStyles,
  Typography
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import MuiTableHead from "@material-ui/core/TableHead";
import MuiTableRow from "@material-ui/core/TableRow";
import MuiTableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

import { t, res } from "../../services/i18nService";

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0)
    : (a, b) =>
        a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
}

const columnData = () => [
  {
    id: "domain",
    numeric: false,
    disablePadding: false,
    label: t(res.VALIDATOR_LIST_COL_DOMAIN)
  }
  // {
  //   id: "pubkey",
  //   numeric: false,
  //   disablePadding: false,
  //   label: t(res.VALIDATOR_LIST_COL_PUBKEY)
  // }
];

class EnhancedTableHead extends React.Component<any, any> {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <MuiTableHead component="div">
        <MuiTableRow component="div">
          {columnData().map(column => {
            return (
              <MuiTableCell
                component="div"
                key={column.id}
                numeric={column.numeric}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <MuiTableSortLabel
                    component="div"
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </MuiTableSortLabel>
                </Tooltip>
              </MuiTableCell>
            );
          }, this)}
        </MuiTableRow>
      </MuiTableHead>
    );
  }
}

const styles = theme =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    },
    table: {},
    tableWrapper: {
      overflowX: "auto"
    },
    itemMargin: {
      marginTop: theme.spacing.unit * 1,
      marginLeft: theme.spacing.unit * 3
    },
    numberCell: {
      marginRight: theme.spacing.unit * 4
    },
    chip: {
      margin: theme.spacing.unit,
      backgroundColor: "transparent"
    },
    primaryTableCell: {
      width: "50%",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    secondaryTableCell: {
      width: "50%",
      cursor: "pointer"
    }
  });

class EnhancedTable extends React.Component<any, any> {
  _windowScroller;
  state = {
    order: "asc",
    orderBy: "domain",
    selected: [],
    page: 0,
    secondary: false
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  setRef = windowScroller => {
    this._windowScroller = windowScroller;
    setInterval(() => {
      if (this._windowScroller) {
        this._windowScroller.updatePosition();
      }
    }, 1000);
  };

  render() {
    const { classes, list } = this.props;
    const { order, orderBy, selected } = this.state;
    list.sort(getSorting(order, orderBy));

    return (
      list && (
        <div className={classes.tableWrapper}>
          <AutoSizer disableHeight>
            {({ width }) => (
              <WindowScroller ref={this.setRef}>
                {({ height, isScrolling, onChildScroll, scrollTop }) => {
                  return (
                    <MuiTable
                      component="div"
                      className={classes.table}
                      aria-labelledby="tableTitle"
                    >
                      <EnhancedTableHead
                        component="div"
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                      />
                      <TableBody component="div">
                        <List
                          autoHeight
                          height={height}
                          scrollTop={scrollTop}
                          isScrolling={isScrolling}
                          onScroll={onChildScroll}
                          rowCount={list.length}
                          rowHeight={50}
                          width={width}
                          rowRenderer={({
                            key, // Unique key within array of rows
                            index, // Index of row within collection
                            isScrolling, // The List is currently being scrolled
                            isVisible, // This row is visible within the List (eg it is not an overscanned row)
                            style // Style object to be applied to row (to position it)
                          }) => {
                            const v = list[index];
                            let domainElement: any = `${t(
                              res.DOMAIN_UNVERIFIED
                            )}`;
                            if (v.domain) {
                              domainElement = (
                                <span>
                                  {v.domain}
                                  {!v.verified
                                    ? ` ${t(res.DOMAIN_UNVERIFIED)}`
                                    : ""}
                                </span>
                              );
                            }
                            return (
                              <div style={style} key={key}>
                                <MuiTableRow
                                  hover
                                  tabIndex={-1}
                                  component="div"
                                  style={{
                                    width: "100%",
                                    display: "inline-table"
                                  }}
                                >
                                  <MuiTableCell
                                    component="div"
                                    className={classes.primaryTableCell}
                                    onClick={() =>
                                      window.open(
                                        `https://${v.domain}`,
                                        "_blank"
                                      )
                                    }
                                    scope="row"
                                  >
                                    <Typography>{domainElement}</Typography>
                                  </MuiTableCell>
                                  <Hidden xsDown>
                                    <MuiTableCell
                                      component="div"
                                      className={classes.secondaryTableCell}
                                      onClick={() =>
                                        window.open(
                                          `https://xrpcharts.ripple.com/#/validators/${
                                            v.pubkey
                                          }`,
                                          "_blank"
                                        )
                                      }
                                      scope="row"
                                    >
                                      <Typography>
                                        <code>{v.pubkey}</code>
                                      </Typography>
                                    </MuiTableCell>
                                  </Hidden>
                                </MuiTableRow>
                              </div>
                            );
                          }}
                        />
                      </TableBody>
                    </MuiTable>
                  );
                }}
              </WindowScroller>
            )}
          </AutoSizer>
        </div>
      )
    );
  }
}

export default withStyles(styles)(EnhancedTable);
