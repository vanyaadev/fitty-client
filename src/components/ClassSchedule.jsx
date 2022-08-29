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
  Content,
  TextEditor,
} from './ClassScheduleComponents';
import { useState } from 'react';

let currentDate = new Date();

export default function ClassSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentViewName, setCurrentViewName] = useState('Week');

  const { data: classes } = useClasses();
  const { data: instructors } = useInstructors();
  const { data: user } = useMe();
  const mutation = usePostClasses();
  const commitChanges = ({ added, changed, deleted }) => {
    console.log('abc');
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
    const currWeekStart = new Date();
    currWeekStart.setHours(0, 0, 0, 0);
    currWeekStart.setDate(currWeekStart.getDate() - currWeekStart.getDay());
    if (changedDate >= currWeekStart) setCurrentDate(changedDate);
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
          // defaultCurrentDate={currentDate}
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
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <Appointments />
        <Resources data={resources} />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
          contentComponent={Content}
        />
        {user && user.roles.some((role) => role.value === 'ADMIN') && (
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
