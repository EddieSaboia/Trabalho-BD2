import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';

import { 
  TableCell as MuiTableCell,
  TableRow as MuiTableRow } from "@material-ui/core";
  import { Paper as MuiPaper } from "@material-ui/core";

  export const Paper = styled(MuiPaper)`
    margin-top: 3%;
    margin-bottom: 3%;
  `
  export const TableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.background.default,
    },
    body: {
      fontSize: 14,
    },
  }))(MuiTableCell);
  
  export const TableRow = withStyles(theme => ({
    root: {
    },
  }))(MuiTableRow);

  export const TableHeadCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.background.surface,
    },
    body: {
      fontSize: 14,

    },
  }))(MuiTableCell);

  export const SpanColor = styled.div`
    background-color: green;
  `