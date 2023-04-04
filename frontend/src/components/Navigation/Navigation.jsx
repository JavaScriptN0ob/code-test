import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 4px 20px;
  margin: 20px 80px 40px 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Item = styled.div`
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
`;

const NavItem = ({ name }) => (
  <NavLink to={`/${name}`}>
    {({ isActive }) => <Item isActive={isActive}>{name}</Item>}
  </NavLink>
);

const Navigation = () => {
  const navList = ['home', 'category', 'search'];

  return (
    <Wrapper>
      {navList.map((nav) => (
        <NavItem key={nav} name={nav} />
      ))}
    </Wrapper>
  );
};

export default Navigation;
