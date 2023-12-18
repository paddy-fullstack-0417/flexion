import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RuleIcon from '@mui/icons-material/Rule';
import { Button, ButtonGroup, Card, CardActions, CardContent, Chip, Divider, Stack, TableHead, TextField, Typography } from '@mui/material';
import TablePaginationActions from '../global/TablePaginationActions';
import * as Actions from '../../redux/actions';
import { OUTPUT_TYPE } from '../../config/enum';
import isEmpty from '../../validation/is-empty';

const StudentPanel = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [errors, setErrors] = useState({});

    const { user } = useSelector(({ auth }) => (auth));
    const { problems } = useSelector(({ panel }) => (panel));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getAllProblemsByStudents());
    }, [dispatch]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - problems.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (problemId, value) => {
        const { [problemId]: omittedKey, ...updatedErrors } = errors;
        setErrors({ ...updatedErrors });
        if (isEmpty(value)) {
            setErrors({
                ...errors,
                [problemId]: 'Student response is required'
            });
        }
        dispatch(Actions.setStudentResponse(problemId, value));
    };

    const handleSubmitAnswer = () => {
        dispatch(Actions.submitAnswer(user._id, problems, isEmpty(errors)));
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Problems</Typography>
            <Divider />
            <Card
                component={'form'}
                noValidate
            >
                <CardContent>
                    <TableContainer>
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Input Numerical Value</TableCell>
                                    <TableCell>Input Unit of Measure</TableCell>
                                    <TableCell>Target Unit of Measure</TableCell>
                                    <TableCell>Student Response</TableCell>
                                    <TableCell>Output</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? problems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : problems
                                ).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.inputNumericalValue}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.inputUnitOfMeasure}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.targetUnitOfMeasure}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <TextField
                                                margin="normal"
                                                size='small'
                                                name="studentResponse"
                                                type="studentResponse"
                                                id="studentResponse"
                                                error={errors[row._id] ? true : false}
                                                defaultValue={0}
                                                helperText={errors[row._id]}
                                                onChange={(e) => handleInputChange(row._id, e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.output === OUTPUT_TYPE.PENDING &&
                                                (<Chip variant='outlined' label="Pending" color="primary" />)}
                                            {row.output === OUTPUT_TYPE.CORRECT &&
                                                (<Chip variant='outlined' label="Correct" color="success" />)}
                                            {row.output === OUTPUT_TYPE.INCORRECT &&
                                                (<Chip variant='outlined' label="Incorrect" color="secondary" />)}
                                            {row.output === OUTPUT_TYPE.INVALID &&
                                                (<Chip variant='outlined' label="Invalid" color="error" />)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 50 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={11}
                                        count={problems.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page'
                                            },
                                            native: true
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGroup>
                        <Button
                            variant='outlined'
                            startIcon={<RuleIcon />}
                            onClick={handleSubmitAnswer}
                        >Submit</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Stack>
    );
}

export default StudentPanel;