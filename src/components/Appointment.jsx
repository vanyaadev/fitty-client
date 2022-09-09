import React from 'react';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

export const Appointment = ({ children, data, ...restProps }) => {
  return (
    <Appointments.Appointment data={data} {...restProps}>
      <div
        style={{
          position: 'absolute',
          right: '2px',
          bottom: '-4px',
          color: 'white',
        }}
      >
        {`${data.numberParticipants}/${data.maximumParticipants}`}
      </div>
      {data.enrolled && (
        <CheckBoxTwoToneIcon
          style={{ position: 'absolute', right: '0px', color: 'white' }}
          fontSize="medium"
        />
      )}

      {children}
    </Appointments.Appointment>
  );
};
