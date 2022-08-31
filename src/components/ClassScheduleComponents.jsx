import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useEnroll, useUnEnroll } from '../api/queries';
import { apiRoutes } from '../routes';
import InfoIcon from '@mui/icons-material/Info';

export const BoolEditor = (props) => {
  return null;
};

export const TextEditor = (props) => {
  if (props.type === 'multilineTextEditor') {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

export const DateEditor = ({ value, onValueChange }) => {
  return (
    <TextField
      type="datetime-local"
      // defaultValue="2017-05-24T10:30"
      sx={{ flex: 1, marginTop: '5px' }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(e) => onValueChange(new Date(e.target.value))}
      value={value.toISOString().slice(0, 16)}
    />
  );
};

export const Appointment = ({
  children,
  data,
  toggleVisibility,
  onAppointmentMetaChange,
  ...restProps
}) => (
  <Appointments.Appointment {...restProps}>
    <React.Fragment>
      <IconButton size="large">
        <InfoIcon fontSize="small" />
      </IconButton>
      {children}
    </React.Fragment>
  </Appointments.Appointment>
);
export const TooltipContent = ({
  children,
  appointmentData,
  toggleVisibility,
  ...restProps
}) => {
  const enroll = useEnroll();
  const unEnroll = useUnEnroll();
  const queryClient = useQueryClient();
  const onClickEnroll = () => {
    const mutationEffect = appointmentData.enrolled ? unEnroll : enroll;
    mutationEffect.mutate(
      { id: appointmentData.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([apiRoutes.classes]);
          toggleVisibility(false);
        },
      }
    );
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
          onClick={() => onClickEnroll()}
        >
          {appointmentData.enrolled ? 'Cancel' : 'Enroll'}
        </Button>
      </Grid>
    </AppointmentTooltip.Content>
  );
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
    </AppointmentForm.BasicLayout>
  );
};
