import {
  AppointmentForm,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useEnroll } from '../api/queries';

export const Content = ({ children, appointmentData, ...restProps }) => {
  const enroll = useEnroll();
  const onClickEnroll = (event, userId) => {
    enroll.mutate({ userId });
  };

  return (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Button
          variant="outlined"
          color={appointmentData.enrolled ? 'error' : 'info'}
          onClick={(event) => onClickEnroll(event, appointmentData.id)}
        >
          {appointmentData.enrolled ? 'Cancel' : 'Enroll'}
        </Button>
      </Grid>
    </AppointmentTooltip.Content>
  );
};

export const BoolEditor = (props) => {
  return null;
};

export const TextEditor = (props) => {
  if (props.type === 'multilineTextEditor') {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

export const BasicLayout = ({
  onFieldChange,
  appointmentData,
  ...restProps
}) => {
  const onMaxParticipantsChange = (nextValue) => {
    onFieldChange({ maximumParticipants: parseInt(nextValue) });
  };
  const onDescriptionChange = (nextValue) => {
    onFieldChange({ description: nextValue });
  };
  const onInstructorChange = (nextValue) => {
    onFieldChange({ instructor: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text="Description" />
      <AppointmentForm.TextEditor
        value={appointmentData.description}
        onValueChange={onDescriptionChange}
        placeholder="Description"
      />
      <AppointmentForm.Label text="Maximum participants" />
      <AppointmentForm.TextEditor
        value={appointmentData.maximumParticipants}
        onValueChange={onMaxParticipantsChange}
        placeholder="Maximum participants"
        type="numberEditor"
      />
      <AppointmentForm.Label text="Instructor" />
      <Autocomplete
        disablePortal
        options={['a', 'b', 'c']}
        renderInput={(params) => <TextField {...params} />}
        onChange={onInstructorChange}
      />
    </AppointmentForm.BasicLayout>
  );
};
