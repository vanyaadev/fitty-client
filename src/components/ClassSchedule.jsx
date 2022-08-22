import * as React from 'react';
import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  Toolbar,
  DateNavigator,
  TodayButton,
  DayView,
  MonthView,
  ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material';
import { useClasses, useMe, usePostClasses } from '../api/queries';

const currentDate = '2022-08-2';

export default function ClassSchedule() {
  const { data: classes } = useClasses();
  const { data: user } = useMe();
  const mutation = usePostClasses();

  const commitChanges = ({ added, changed, deleted }) => {
    mutation.mutate({
      name: added.title,
      startDate: added.startDate,
      endDate: added.endDate,
      maximumParticipants: added.maximumParticipants,
      placeId: 1,
    });
  };

  return (
    <Paper>
      <Scheduler data={classes} height={660}>
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={10} endDayHour={19} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <EditingState onCommitChanges={commitChanges} />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton />
        {user && user.roles.some(role => role.value === 'ADMIN') && (
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            booleanEditorComponent={BoolEditor}
            textEditorComponent={TextEditor}
          />
        )}
      </Scheduler>
    </Paper>
  );
}

const BoolEditor = props => {
  return null;
};

const TextEditor = props => {
  if (props.type === 'multilineTextEditor') {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onMaxParticipantsChange = nextValue => {
    onFieldChange({ maximumParticipants: parseInt(nextValue) });
  };
  const onDescriptionChange = nextValue => {
    onFieldChange({ description: nextValue });
  };
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.TextEditor
        value={appointmentData.description}
        onValueChange={onDescriptionChange}
        placeholder="Description"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.maximumParticipants}
        onValueChange={onMaxParticipantsChange}
        placeholder="Maximum participants"
        type="numberEditor"
      />
    </AppointmentForm.BasicLayout>
  );
};
