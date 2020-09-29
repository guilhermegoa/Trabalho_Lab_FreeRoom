import React from 'react';

import Header from '../../components/Header';

import { Container, Content } from './styles';

function AppLayout({ children }) {
  return (
    <Container>
      <Content>
        <Header />
        {children}
      </Content>
    </Container>
  );
}

export default AppLayout;
