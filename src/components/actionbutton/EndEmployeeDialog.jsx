import React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DateSelect from '../PopupComponenets/DateSelect';
import dayjs from 'dayjs';
import { 
    Dialog,
    Button,
    Typography,
    Stack,
    Grid,
    RadioGroup,
    FormControlLabel,
    Autocomplete,
    TextField,
    Chip} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
    typography: {
      h2: {
        fontWeight: 600,
        fontFamily: 'Inter',
        fontSize: '16px',
        color: '#344054',
      },
      body1: {
        fontWeight: 550,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#344054',
        marginBottom: '3px',
       
      },
      body2: {
        fontWeight: 400,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#344054',
        marginLeft: '9px',
        marginTop: '4px',
        padding: '9px, 10px',
      },
      body3: {
        fontWeight: 400,
        fontFamily: 'Inter',
        fontSize: '13px',
        color: '#475467',
        padding: '9px, 10px',
      },
    },
});

const reasonCategories = [
    "Personal",
    "Poor performance",
    "Misconduct",
    "Attendance issues",
    "Violation of company policy",
    "Insubordination",
    "Redundancy",
    "Budget cuts",
    "Conflict of interest",
    "Dishonesty",
    "Drug or alcohol use",
    "Incompetence",
    "Negative attitude",
    "Gross misconduct",
    "Legal issues",
    "Breaching confidentiality"
];

export default function EndEmployeeDialog({ open, onClose, openConfirmationDialog, empId }) {
    const [selectedOption, setSelectedOption] = useState('endnow');
    const [terminationReason, setTerminationReason] = useState(reasonCategories[0]);
    const [terminationNote, setTerminationNote] = useState('');
    const [date, setDate] = useState(null);
    const [openDateDialog, setOpenDateDialog] = useState(false);
   
    
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleEndEmployment = () => {
        const data = {
            empId: empId,
            option: selectedOption,
            date: selectedOption === 'endlater' ? date : null,
            notes: terminationNote,
            reason: terminationReason
        };
        openConfirmationDialog(data); // Pass the data to the second dialog
    };

    const handleClose = () => {
        // Reset the dialog's state
        setSelectedOption('endnow');
        setTerminationReason(reasonCategories[0]);
        setTerminationNote('');
        setDate(null);
        
        // Close the dialog
        onClose();
    };

  return (
    <ThemeProvider theme={theme}>

    <Dialog open={open} onClose={handleClose} PaperProps={{
        sx: {
        width: '537px',
        maxWidth: '537px', 
        margin: 'auto', 
        borderRadius:'12px',
        }
    }}>
      <Stack direction="column" spacing={2} sx={{ padding: '36px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ marginBottom: "30px" }}>
                <Typography variant="h2">End Employment</Typography>
                <CloseIcon onClick={handleClose} sx={{
                    backgroundColor: "#FFFFFFF",
                    "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#D0D5DD"
                    }
                }}/>
        </Stack>

        <Typography variant="body1">Reason</Typography>
            <Autocomplete 
                disablePortal 
                options={reasonCategories} 
                renderInput={(params) => <TextField {...params} placeholder="Select" sx={{
                    width:'100%',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            backgroundColor: "transparent !important",
                            borderColor: '#D0D5DD', // Set the initial border color
                        },
                        '&:hover fieldset': {
                            backgroundColor: "transparent !important",
                            borderColor: '#D0D5DD', // Set the hover border color
                        },
                        '&.Mui-focused fieldset': {
                            backgroundColor: "transparent !important",
                            borderColor: '#D0D5DD', // Set the focused border color
                        },
                    },
                }} 
                InputProps={{
                    ...params.InputProps,
                    endAdornment: null, // Remove the clear icon
                  }}
                />}
                value={terminationReason}
                onChange={(e, newTerminationReason) => setTerminationReason(newTerminationReason)}
                sx={{ width:'100%', marginBottom: "30px" }}
            />

            <Stack direction="row" alignItems="center" spacing={1} sx={{ marginLeft:'7px', marginBottom: "30px" }}>
                <RadioGroup value={selectedOption} onChange={handleChange}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <FormControlLabel
                                value="endnow"
                                control={
                                    <Checkbox 
                                        type="radio" 
                                        checked={selectedOption === "endnow"} 
                                        onChange={handleChange}
                                    />
                                }
                                label={<Typography variant="body2">End employment now</Typography>}
                                sx={{ paddingX: '5px' }}
                            />
                        </Grid>
                        
                        <Grid item>
                            <FormControlLabel
                                value="endlater"
                                control={
                                    <Checkbox 
                                        type="radio" 
                                        checked={selectedOption === "endlater"} 
                                        onChange={handleChange}
                                        sx={{ paddingX: '30px' }}
                                    />
                                }
                                sx={{ paddingX: '5px' }}
                                label={<Typography variant="body2">End employment at a later date</Typography>}
                            />
                        </Grid>
                        
                        <Grid item>
                            <Chip 
                                icon={<CalendarMonthIcon />} 
                                label={date ? dayjs(date).format('MMM D, YYYY') : 'Select a date'}
                                variant="outlined" 
                                onClick={() => setOpenDateDialog(true)}
                                tabIndex={0} 
                                aria-hidden="false"
                                sx={{ 
                                    borderRadius: "4px", 
                                    marginTop: "0px",
                                    paddingLeft: "5px",
                                    marginLeft: "25px",
                                    opacity: selectedOption === 'endlater' ? 1 : 0.5,
                                    pointerEvents: selectedOption === 'endlater' ? 'auto' : 'none'
                                }}
                            />
                        </Grid>
                    </Grid>
                </RadioGroup>
            </Stack>

            <Typography variant="body1">Notes</Typography>
            <TextField
                id="description"
                multiline
                rows={4}
                value={terminationNote}
                onChange={(e) => setTerminationNote(e.target.value)}
                aria-label="Enter a description"
                sx={{
                    marginBottom: "30px",
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#D0D5DD', // Set the initial border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#D0D5DD', // Set the hover border color
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#D0D5DD', // Set the focused border color
                        },
                    },
                    width: '100%',
                }}
            />


        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={3}>
                <Button mode="secondaryB" onClick={handleClose}>Cancel</Button>
                <Button mode="primary" onClick={handleEndEmployment}>End Employment</Button>
        </Stack>
        <Dialog open={openDateDialog} onClose={() => setOpenDateDialog(false)} disableEnforceFocus={false}>
            <DateSelect close={() => setOpenDateDialog(false)} setDate={setDate} />
        </Dialog>
        
      </Stack>
    </Dialog>
    </ThemeProvider>
  );
}