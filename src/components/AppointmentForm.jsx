import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { TextField } from '@mui/material';
import React from 'react';

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
