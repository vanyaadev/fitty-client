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
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material';
import {
  useClasses,
  useInstructors,
  useMe,
  usePostClasses,
} from '../api/queries';
import {
  BasicLayout,
  BoolEditor,
  TooltipContent,
  DateEditor,
  TextEditor,
  Appointment,
} from './ClassScheduleComponents';
import { useState } from 'react';
import { connectProps } from '@devexpress/dx-react-core';

let currentDate = new Date();

export default function ClassSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTooltipVisible, setIsToolTipVisible] = useState();
  const [currentViewName, setCurrentViewName] = useState('Week');
  const [editingAppointment, setEditingAppointment] = useState();
  const { data: classes } = useClasses();
  const { data: instructors } = useInstructors();
  const { data: user } = useMe();
  const mutation = usePostClasses();
  const commitChanges = (args) => {
    console.log('abc');
    let ap = editingAppointment;
    let a = 2;
    // mutation.mutate({
    //   name: added.title,
    //   startDate: added.startDate,
    //   endDate: added.endDate,
    //   maximumParticipants: added.maximumParticipants,
    //   placeId: 1,
    // });
  };

  const onCurrentDateChange = (changedDate) => {
    const viewStart = new Date();
    viewStart.setHours(0, 0, 0, 0);
    viewStart.setDate(viewStart.getDate() - viewStart.getDay());
    if (changedDate >= viewStart) setCurrentDate(changedDate);
  };

  const onCurrentViewNameChange = (changedViewName) => {
    setCurrentViewName(changedViewName);
  };

  const resources = [
    {
      fieldName: 'instructorId',
      title: 'Instructors',
      instances: instructors || [],
    },
  ];

  return (
    <Paper>
      <Scheduler data={classes} height={1000}>
        <ViewState
          currentDate={currentDate}
          defaultCurrentViewName="Week"
          currentViewName={currentViewName}
          onCurrentDateChange={onCurrentDateChange}
          onCurrentViewNameChange={onCurrentViewNameChange}
        />
        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={10} endDayHour={19} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={(appointment) =>
            setEditingAppointment(appointment)
          }
        />
        <IntegratedEditing />
        <Appointments appointmentComponent={Appointment} />
        <Resources data={resources} />
        <AppointmentTooltip
          onVisibilityChange={(visible) => setIsToolTipVisible(visible)}
          visible={isTooltipVisible}
          showCloseButton
          showOpenButton
          contentComponent={(props) => (
            <TooltipContent toggleVisibility={setIsToolTipVisible} {...props} />
          )}
        />
        {user && user.roles.some((role) => role.value === 'ADMIN') && (
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            booleanEditorComponent={BoolEditor}
            textEditorComponent={TextEditor}
            dateEditorComponent={DateEditor}
          />
        )}
      </Scheduler>
    </Paper>
  );
}
