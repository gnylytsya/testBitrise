import React from 'react';
import { NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class NetworkHandler extends React.Component {
  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      realtimeDatabaseMode: PropTypes.bool,
    };
  }

  handleConnectionChange = (connectionInfo) => {
    this.props.dispatch({
      type: 'SET_NETWORK_CONNECTION_INFO',
      payload: {
        network: connectionInfo,
      },
    });

    if (
      this.props.realtimeDatabaseMode &&
      (connectionInfo.type === 'none' ||
        (connectionInfo.type === 'cellular' && connectionInfo.effectiveType === '2g'))
    ) {
      this.goOffline();
    } else if (
      !this.props.realtimeDatabaseMode &&
      (connectionInfo.type !== 'none' && connectionInfo.effectiveType !== '2g')
    ) {
      this.goOnline();
    }
  };

  goOffline = () => {
    this.props.dispatch({
      type: 'goOffline',
      meta: {
        nextAction: {
          type: 'TOGGLE_REALTIME_DATABASE_MODE',
        },
      },
    });
  };

  goOnline = () => {
    this.props.dispatch({
      type: 'goOnline',
      meta: {
        nextAction: {
          type: 'TOGGLE_REALTIME_DATABASE_MODE',
        },
      },
    });
  };

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    realtimeDatabaseMode: state.appState.realtimeDatabaseMode,
  };
}

export default connect(mapStateToProps)(NetworkHandler);
