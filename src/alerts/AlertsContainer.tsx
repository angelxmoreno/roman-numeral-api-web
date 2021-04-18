import { FC, useState } from 'react';
import { Alert } from 'reactstrap';
import { AlertEntity, useAlerts } from '@/alerts/index';

const AlertRow: FC<{ alert: AlertEntity }> = ({ alert }) => {
  const { remove } = useAlerts();

  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      remove(alert.id);
    }, 1000);
  };

  return (
    <Alert color={alert.type} isOpen={visible} toggle={onDismiss}>
      {alert.message}
    </Alert>
  );
};
const AlertsContainer: FC = () => {
  const { alerts } = useAlerts();

  return (
    <div style={{ position: `relative` }}>
      <div style={{ position: `absolute`, width: `100%` }}>
        {alerts.map((alert) => (
          <AlertRow key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertsContainer;
