import React, { FC } from 'react';
import NavBarTop from './NavBarTop';

const PageContainer: FC<unknown> = ({ children }) => (
  <>
    <NavBarTop />
    {children}
  </>
);

export default PageContainer;
