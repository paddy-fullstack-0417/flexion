import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup, Card, CardActions, CardContent, Divider, IconButton, Stack, TableHead, Typography } from '@mui/material';
import TablePaginationActions from '../global/TablePaginationActions';
import AddProblemModal from './modal/AddProblemModal';
import EditProblemModal from './modal/EditProblemModal';
import * as Actions from '../../redux/actions';

const TeacherPanel = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentProblem, setCurrentProblem] = useState();

    const { problems } = useSelector(({ panel }) => (panel));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getAllProblems());
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
    const [openAddProblem, setOpenAddProblem] = useState(false);
    const [openEditProblem, setOpenEditProblem] = useState(false);

    const handleAddProblemOpen = () => {
        dispatch(Actions.clearErrors());
        setOpenAddProblem(true);
    };
    const handleAddProblemClose = () => setOpenAddProblem(false);

    const handleEditProblemOpen = (problem) => {
        dispatch(Actions.clearErrors());
        setCurrentProblem(problem);
        setOpenEditProblem(true);
    };
    const handleEditProblemClose = () => setOpenEditProblem(false);

    const removeProblem = (problem) => {
        dispatch(Actions.removeProblem(problem._id));
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
                                    <TableCell>Actions</TableCell>
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
                                            {row.studentResponse}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Stack sx={{ display: 'block', width: '5rem' }}>
                                                <IconButton onClick={() => handleEditProblemOpen(row)}><EditIcon /></IconButton>
                                                <IconButton onClick={() => removeProblem(row)}><DeleteIcon /></IconButton>
                                            </Stack>
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
                            startIcon={<AddCircleIcon />}
                            onClick={handleAddProblemOpen}
                        >Add</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
            <AddProblemModal
                open={openAddProblem}
                handleClose={handleAddProblemClose}
            />
            <EditProblemModal
                open={openEditProblem}
                handleClose={handleEditProblemClose}
                problem={currentProblem}
            />
        </Stack>
    );
}

export default TeacherPanel;