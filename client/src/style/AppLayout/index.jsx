import React from 'react';

import Header from '../../components/Header';

import { Container, Content, Layout } from './styles';

function AppLayout({ children }) {
  return (
    <Container>
      <Content>
        <Header />
        <Layout>
          {children}
        </Layout>
      </Content>
    </Container>
  );
}

export default AppLayout;
