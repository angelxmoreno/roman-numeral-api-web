import React, { FC } from 'react';
import Link from 'next/link';
import { NavItem } from 'reactstrap';
import { useRouter } from 'next/router';

type Props = {
  to: string;
  label: string;
};

const NavItemLink: FC<Props> = ({ to, label }) => {
  const router = useRouter();

  const active = router.asPath === to;
  return (
    <NavItem active={active}>
      <Link href={to}>
        <a className="nav-link">{label}</a>
      </Link>
    </NavItem>
  );
};

export default NavItemLink;
