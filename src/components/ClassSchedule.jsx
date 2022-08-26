import * as React from 'react';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
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

const currentDate = new Date();

export default function ClassSchedule() {
  const { data: classes } = useClasses();
  const { data: instructors } = useInstructors();
  const { data: user } = useMe();
  const mutation = usePostClasses();

  const commitChanges = (props) => {
    let a = 2;
    // mutation.mutate({
    //   name: added.title,
    //   startDate: added.startDate,
    //   endDate: added.endDate,
    //   maximumParticipants: added.maximumParticipants,
    //   placeId: 1,
    // });
  };
  const owners = [
    {
      text: 'Andrew Glover',
      id: 1,
      color: '#7E57C2',
    },
    {
      text: 'Arnie Schwartz',
      id: 2,
      color: '#FF7043',
    },
    {
      text: 'John Heart',
      id: 3,
      color: '#E91E63',
    },
    {
      text: 'Taylor Riley',
      id: 4,
      color: '#E91E63',
    },
    {
      text: 'Brad Farkus',
      id: 5,
      color: '#AB47BC',
    },
    {
      text: 'Arthur Miller',
      id: 6,
      color: '#FFA726',
    },
  ];

  const resources = [
    {
      fieldName: 'ownerId',
      title: 'Owners',
      instances: owners,
    },
  ];

  return (
    <Paper>
      <Scheduler data={classes} height={1000}>
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
