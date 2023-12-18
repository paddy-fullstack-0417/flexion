import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddProblem from '../AddProblem';

const addProblemModalCSS = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    boxShadow: '24px',
    padding: '2rem',
    outline: 'none',
    width: '600px'
}

const AddProblemModal = ({ open, handleClose }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={addProblemModalCSS}>
                    <AddProblem handleClose={handleClose} />
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddProblemModal;