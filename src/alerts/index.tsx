import { createContext, FC, useContext, useState } from 'react';
import * as ls from 'local-storage';

export interface AlertEntity {
  id: string;
  type: string;
  message: string;
  title?: string;
  content?: string;
}

const STORAGE_KEY = `_alertsCollection`;

interface AlertsState {
  alerts: AlertEntity[];
  push: (alert: AlertEntity) => void;
  error: (msg: string) => void;
  success: (msg: string) => void;
  remove: (id: string) => void;
  auth: (message: string, type?: string) => void;
}

export const AlertsContext = createContext<AlertsState>({
  alerts: [],
  push: (alert) => alert,
  error: (msg) => msg,
  success: (msg) => msg,
  remove: (id: string) => id,
  auth: (message: string, type?: string) => message + type,
});

export const AlertsProvider: FC = ({ children }) => {
  const storedAlerts = ls.get<AlertEntity[]>(STORAGE_KEY);
  const [alerts, setAlerts] = useState<AlertEntity[]>(
    Array.isArray(storedAlerts) ? storedAlerts : [],
  );

  const push = (alert: Partial<AlertEntity>) => {
    const newAlert = { id: Date.now().toString(10), ...alert } as AlertEntity;
    const newAlerts = [...alerts, newAlert];
    ls.set<AlertEntity[]>(STORAGE_KEY, newAlerts);

    setAlerts(newAlerts);
  };

  const remove = (id: string) => {
    const newAlerts = alerts.filter((alert) => alert.id !== id);
    ls.set<AlertEntity[]>(STORAGE_KEY, newAlerts);
    setAlerts(newAlerts);
  };

  const auth = (message: string, type = `success`) => {
    const newAlerts = alerts.filter((alert) => alert.id !== `auth`);
    newAlerts.push({
      id: `auth`,
      type,
      message,
    });
    ls.set<AlertEntity[]>(STORAGE_KEY, newAlerts);
    setAlerts(newAlerts);
  };

  const error = (message: string) => push({ message, type: `danger` });
  const success = (message: string) => push({ message, type: `success` });

  return (
    <AlertsContext.Provider
      value={{ alerts, push, error, success, remove, auth }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertsContext);
