/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { setGlobalStore } from './actions';

import UsersPage from 'containers/User/UsersPage/Loadable';
import AdminsPage from 'containers/Admin/AdminsPage/Loadable';

import Header from 'components/Share/Layout/Header';
import Footer from 'components/Share/Layout/Footer';
import UserSider from 'components/User/UserSider';
import AdminSider from 'components/Admin/AdminSider';
import LayoutWrapper from 'components/Share/Layout/LayoutWapper';


import './style.scss';


const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const AppContent = (props) => (
  <Switch>
    <Route exact path="/" component={UsersPage} />
    <Route path="/guest" component={UsersPage} />
    <Route path="/cms" component={AdminsPage} />
  </Switch>
)

const App = (props) => {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <LayoutWrapper header={(
                        <Header logoName="MMO Tools"
                                isLogin={props.isLogin}
                                currentUser={props.currentUser}
                        />
                      )}
                     sider={ props.isAdmin ? <AdminSider /> : <UserSider /> }
                     content={<AppContent />}
                     footer={<Footer />}
      />
    </AppWrapper>
  );
}

function mapStateToProps(state) {
  const { isLogin, isAdmin, currentUser } = state.global;
  return {
    isLogin,
    isAdmin,
    currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalStore: options => dispatch(setGlobalStore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
