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
  useUpdateClass,
} from '../api/queries';
import {
  BasicLayout,
  BoolEditor,
  DateEditor,
  TextEditor,
} from './AppointmentForm';
import { useState } from 'react';
import { TooltipContent, TooltipHeader } from './AppointmentTooltip';
import { Appointment } from './Appointment';

export default function ClassSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isTooltipVisible, setIsToolTipVisible] = useState();
  const [currentViewName, setCurrentViewName] = useState('Week');
  const [editingAppointment, setEditingAppointment] = useState();
  const { data: classes } = useClasses();
  const { data: instructors } = useInstructors();
  const { data: user } = useMe();
  const classMutation = useUpdateClass();
  const commitChanges = (args) => {
    classMutation.mutate({
      id: editingAppointment.id,
      ...args.changed[editingAppointment.id],
    });
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
      title: 'Instructor',
      instances: instructors || [],
    },
  ];

  return (
    <Paper>
      <Scheduler data={classes}>
        <ViewState
          currentDate={currentDate}
          defaultCurrentViewName="Week"
          currentViewName={currentViewName}
          onCurrentDateChange={onCurrentDateChange}
          onCurrentViewNameChange={onCurrentViewNameChange}
        />
        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={10} endDayHour={19} cellDuration={20} />
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
          headerComponent={TooltipHeader}
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
