/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import { usersAction } from '../../actions';
import type { Home as HomeType, Dispatch, ReduxState } from '../../types';
import { UserList } from '../../components';
import styles from './styles.scss';

type Props = { home: HomeType, fetchUsersIfNeeded: () => void };

// Export this for unit testing more easily
export class Home extends PureComponent<Props> {
  componentDidMount() {
    const { fetchUsersIfNeeded } = this.props;

    fetchUsersIfNeeded();
  }

  renderUserList = () => {
    const { home } = this.props;

    if (
      !home.readyStatus ||
      home.readyStatus === 'USERS_INVALID' ||
      home.readyStatus === 'USERS_REQUESTING'
    )
      return <p>Loading...</p>;

    if (home.readyStatus === 'USERS_FAILURE')
      return <p>Oops, Failed to load list!</p>;

    return <UserList list={home.list} />;
  };

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        {this.renderUserList()}
      </div>
    );
  }
}

const mapStateToProps = ({ home }: ReduxState) => ({ home });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersIfNeeded: () => dispatch(usersAction.fetchUsersIfNeeded())
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
