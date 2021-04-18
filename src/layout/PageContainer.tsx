import React, { FC } from 'react';
import AlertsContainer from '@/alerts/AlertsContainer';
import NavBarTop from './NavBarTop';

const PageContainer: FC = ({ children }) => (
  <>
    <NavBarTop />
    <AlertsContainer />
    {children}
  </>
);

export default PageContainer;
