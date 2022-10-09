import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Row, Tabs } from 'antd';
import { setGlobalStore } from 'containers/App/actions';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import UserDetailBox from 'components/Share/UserDetailBox';
import { DollarOutlined, OrderedListOutlined, SwapOutlined } from '@ant-design/icons';
import { ROUTERS } from 'components/contants';
import DepositMethodsList from 'components/User/DepositMethodsList';
import DepositHistoryTable from 'components/User/DepositHistoryTable';
import OrdersHistoryTable from 'components/User/OrdersHistoryTable';
import PageHeaderBar from 'components/Common/PageHeaderBar';

function AccountAssetsPage(props) {
  const tabItems = [
    {
      label: (
        <span>
          <DollarOutlined />
          Phương thức nạp tiền
        </span>
      ),
      key: ROUTERS.ACCOUNT_ASSETS_DEPOSIT_METHODS,
      children: <DepositMethodsList userInfo={props.currentUser}/>,
    },
    {
      label: (
        <span>
          <SwapOutlined />
          Lịch sử nạp tiền
        </span>
      ),
      key: ROUTERS.ACCOUNT_ASSETS_DEPOSITS_HISTORY,
      children: <DepositHistoryTable />,
    },
    {
      label: (
        <span>
          <OrderedListOutlined />
          Lịch sử đơn hàng
        </span>
      ),
      key: ROUTERS.ACCOUNT_ASSETS_ORDERS_HISTORY,
      children: <OrdersHistoryTable products={props.products}/>,
    },
  ]
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Quản lý tài khoản</title>
      </Helmet>
      <PageHeaderBar
        isHome
        goHome={() => props.push('/')}
        title="Quản lý tài khoản"
      />
      <div className="page-contents">
        <Row>
          <Col span={12}>
            <UserDetailBox userInfo={props.currentUser} />
          </Col>
        </Row>
        <br/>
        <Tabs
          defaultActiveKey={props.router.location.pathname}
          items={tabItems}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    currentUser: state.global.currentUser || {},
    products: state.global.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalStore: options => dispatch(setGlobalStore(options)),
    goBack: () => dispatch(goBack()),
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(AccountAssetsPage);