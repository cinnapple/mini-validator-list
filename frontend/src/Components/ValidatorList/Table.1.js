import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

const PrimaryTableCell = withStyles(theme => ({
  body: {
    textDecorationStyle: "dotted"
  }
}))(TableCell);

const NumericTableCell = withStyles(theme => ({
  body: {}
}))(TableCell);

const SecondaryTableCell = withStyles(theme => ({
  body: {
    fontSize: "1rem",
    backgroundColor: theme.palette.primary.light
  }
}))(TableCell);

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0)
    : (a, b) =>
        a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
}

const columnData = [
  {
    id: "domain",
    numeric: false,
    disablePadding: false,
    label: "Domain"
  },
  { id: "agreement", numeric: true, disablePadding: false, label: "Agreement" },
  {
    id: "disagreement",
    numeric: true,
    disablePadding: false,
    label: "Disagreement"
  },
  {
    id: "totalvalidations",
    numeric: true,
    disablePadding: false,
    label: "Total Validations"
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

const styles = theme => ({
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
  secondaryTableCell: {
    width: "100%"
  }
});

const formatAgreementRate = floatNumber => {
  if (isNaN(floatNumber)) {
    return "-";
  }
  return Math.round(floatNumber * 100000) / 100000;
};

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "domain",
      selected: [],
      page: 0,
      secondary: false
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handlePrimaryRowClick = (event, domain) => {};

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected } = this.state;
    return (
      this.props.list && (
        <React.Fragment>
          <div className={classes.tableWrapper}>
            <FormGroup row className={classes.itemMargin}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.secondary}
                    onChange={(event, checked) =>
                      this.setState({ secondary: checked })
                    }
                    value="secondary"
                  />
                }
                label="Show Validation Public Key"
              />
            </FormGroup>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
              <TableBody>
                {this.props.list
                  .sort(getSorting(order, orderBy))
                  .map((v, index) => {
                    const count = index + 1;
                    let domainElement = "(unverified)";
                    if (v.domain) {
                      domainElement = (
                        <span>
                          {v.domain}
                          {!v.verified ? " " + "(unverified)" : ""}
                        </span>
                      );
                    }
                    return (
                      <React.Fragment key={index}>
                        {
                          <TableRow hover tabIndex={-1} key={v.id}>
                            <PrimaryTableCell
                              component="a"
                              scope="row"
                              href={`https://${v.domain}`}
                              target="_blank"
                            >
                              {domainElement}
                            </PrimaryTableCell>
                            <PrimaryTableCell
                              component="a"
                              scope="row"
                              href={`https://xrpcharts.ripple.com/#/validators/${
                                v.pubkey
                              }`}
                              target="_blank"
                            >
                              <code>{v.pubkey}</code>
                            </PrimaryTableCell>
                            {/* <NumericTableCell numeric>
                              {v.is_report_available
                                ? formatAgreementRate(v.agreement)
                                : "-"}
                            </NumericTableCell>
                            <NumericTableCell numeric>
                              {v.is_report_available
                                ? formatAgreementRate(v.disagreement)
                                : "-"}
                            </NumericTableCell>
                            <NumericTableCell numeric>
                              {v.is_report_available ? v.total_ledgers : "-"}
                            </NumericTableCell> */}
                          </TableRow>
                        }
                        {this.state.secondary && (
                          <TableRow hover key={"pubkey-" + v.id}>
                            <SecondaryTableCell
                              component="a"
                              scope="row"
                              href={`https://xrpcharts.ripple.com/#/validators/${
                                v.pubkey
                              }`}
                              className={classes.secondaryTableCell}
                              target="_blank"
                            >
                              <code>{v.pubkey}</code>
                            </SecondaryTableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </React.Fragment>
      )
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);