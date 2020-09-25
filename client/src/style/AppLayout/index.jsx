import React from 'react';

import Header from '../../components/Header';

import { Container, Layout, Content } from './styles';

function AppLayout({ children }) {
  return (
    <Container>
      <Header />
      <Layout>
        <Content>
          {children}
        </Content>
      </Layout>
    </Container>
  );
}

export default AppLayout;
