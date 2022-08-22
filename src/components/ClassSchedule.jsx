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
import { useMutation } from '@tanstack/react-query';

const currentDate = '2022-08-2';
export default function ClassSchedule() {
  const { data, isSuccess } = useClasses();
  const { data: user } = useMe();
  console.log(user);

  const mutation = usePostClasses();
  const onClick = () => {
    mutation.mutate({
      name: 'Judo2',
      startDate: '2022-08-22T13:17:53.606Z',
      endDate: '2022-08-22T13:47:53.606Z',
      maximumParticipants: 25,
      placeId: 1,
    });
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let a = 2;
  };
  return (
    <Paper>
      <Scheduler data={data} height={660}>
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
        {/* <IntegratedEditing /> */}
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton />
        {user && user.roles.some((role) => role.value === 'ADMIN') && (
          <AppointmentForm />
        )}
      </Scheduler>
    </Paper>
  );
}
