import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Button, Grid } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEnroll, useUnEnroll } from '../api/queries';
import { apiRoutes } from '../routes';

export const TooltipHeader = ({ children, ...restProps }) => {
  return (
    <AppointmentTooltip.Header {...restProps}>
      {children}
    </AppointmentTooltip.Header>
  );
};

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
