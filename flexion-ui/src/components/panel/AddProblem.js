import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ProblemModel from '../../models/problem.model';
import { UNIT_OF_MEASURE } from "../../config/enum";
import * as Actions from '../../redux/actions';

const AddProblem = ({ handleClose }) => {

    const dispatch = useDispatch();

    const error = useSelector(({ error }) => error);

    const onAddProblem = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const problem = new ProblemModel({
            inputNumericalValue: data.get('inputNumericalValue'),
            inputUnitOfMeasure: data.get('inputUnitOfMeasure'),
            targetUnitOfMeasure: data.get('targetUnitOfMeasure'),
            studentResponse: data.get('studentResponse')
        });
        dispatch(Actions.addProblem(problem, handleClose));
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Add New Record</Typography>
            <Divider />
            <Typography>Fill in the form below to create a new record. * Indicates a required field.</Typography>
            <Card
                component={'form'}
                onSubmit={onAddProblem}
                noValidate
            >
                <CardMedia
                    component="img"
                    alt="science image"
                    height="140"
                    image="https://source.unsplash.com/random?science"
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} md={6} px={2}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                name="inputNumericalValue"
                                label="Input Numerical Value"
                                id="inputNumericalValue"
                                error={error.inputNumericalValue ? true : false}
                                helperText={error.inputNumericalValue}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} px={2}>
                            <FormControl
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                error={error.inputUnitOfMeasure ? true : false}
                            >
                                <InputLabel id="inputUnitOfMeasureLabel">Input Unit of Measure</InputLabel>
                                <Select
                                    labelId="inputUnitOfMeasureLabel"
                                    id="inputUnitOfMeasure"
                                    name="inputUnitOfMeasure"
                                    label="Input Unit of Measure"
                                >
                                    {UNIT_OF_MEASURE.TEMPERATURE.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                    <Divider />
                                    {UNIT_OF_MEASURE.VOLUME.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{error.inputUnitOfMeasure}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} px={2}>
                            <FormControl
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                error={error.targetUnitOfMeasure ? true : false}
                            >
                                <InputLabel id="targetUnitOfMeasureLabel">Target Unit of Measure</InputLabel>
                                <Select
                                    labelId="targetUnitOfMeasureLabel"
                                    id="targetUnitOfMeasure"
                                    name="targetUnitOfMeasure"
                                    label="Target Unit of Measure"
                                >
                                    {UNIT_OF_MEASURE.TEMPERATURE.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                    <Divider />
                                    {UNIT_OF_MEASURE.VOLUME.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{error.targetUnitOfMeasure}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} px={2}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                name="studentResponse"
                                label="Student Response"
                                id="studentResponse"
                                error={error.studentResponse ? true : false}
                                helperText={error.studentResponse}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGroup>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Stack>
    );
}

export default AddProblem;