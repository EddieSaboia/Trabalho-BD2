import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead, TableFooter } from "@material-ui/core";
import { TableCell, TableRow, TableHeadCell, Paper } from "./styles";

const TableCuston = ({ columns, data, ...props }) => {
  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableHeadCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    let label = ""
                    if(column.id === "overflow"){
                      
                      if(value.length > 0)
                        value.forEach(bucket => {
                          console.log(bucket.element[0])
              
                            label = label + bucket.element[0] + "/" 
                        });
                        return( <p>{label}</p> )
                    }
                    console.log(column.id,value)
                    if(column.id === "index"){
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    }
                    value.forEach(elemento => {
                      label = label + elemento + "/"    
                    })
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <p> </p>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableCuston;
