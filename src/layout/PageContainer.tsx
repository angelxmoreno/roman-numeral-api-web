import React, { FC } from 'react';
import NavBarTop from './NavBarTop';

const PageContainer: FC = ({ children }) => (
  <>
    <NavBarTop />
    {children}
  </>
);

export default PageContainer;
