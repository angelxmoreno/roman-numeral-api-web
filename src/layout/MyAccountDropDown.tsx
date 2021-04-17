import React, { FC } from 'react';
import Link from 'next/link';
import { DropdownItem, DropdownMenu } from 'reactstrap';
import { useFEAuthCookies } from '@/cookies/auth';

const MyAccountDropDown: FC = () => {
  const [isAuthenticated] = useFEAuthCookies();
  return (
    <DropdownMenu right>
      {!isAuthenticated && (
        <>
          <Link href="/login">
            <DropdownItem>Log In</DropdownItem>
          </Link>
          <Link href="/Register">
            <DropdownItem>Register</DropdownItem>
          </Link>
        </>
      )}

      {isAuthenticated && (
        <Link href="/logout">
          <DropdownItem>Log Out</DropdownItem>
        </Link>
      )}

      <DropdownItem divider />
      <DropdownItem>Reset</DropdownItem>
    </DropdownMenu>
  );
};

export default MyAccountDropDown;
