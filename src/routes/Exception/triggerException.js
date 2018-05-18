import React, { PureComponent } from 'react';
import { Button, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './style.less';

@connect(state => ({
  isloading: state.error.isloading,
}))
export default class TriggerException extends PureComponent {
  state = {
    isloading: false,
  };
  triggerError = code => {
    this.setState({
      isloading: true,
    });
    this.props.dispatch({
      type: 'error/query',
      payload: {
        code,
      },
    });
  };
  render() {
    return (
      <Card>
        <Spin spinning={this.state.isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={() => this.triggerError(401)}>
            Trigger 401
          </Button>
          <Button type="danger" onClick={() => this.triggerError(403)}>
            Trigger 403
          </Button>
          <Button type="danger" onClick={() => this.triggerError(500)}>
            Trigger 500
          </Button>
          <Button type="danger" onClick={() => this.triggerError(404)}>
            Trigger 404
          </Button>
        </Spin>
      </Card>
    );
  }
}
