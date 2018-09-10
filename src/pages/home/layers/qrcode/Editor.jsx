import './style.less';

import React, { Component } from 'react';

import { Input } from 'antd';
import debounce from 'lodash/debounce';

const { TextArea } = Input;
/**
 * @desc qrcode
 */
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.layer.data
    };
  }

  changeTextArea = e => {
    this.setState({ data: e.target.value });
    this.renderLayer();
  };

  // renderLayer
  renderLayer = debounce(() => {
    console.log('更新视图');
    this.props.layer.data = this.state.data;
    $(`#${this.props.layer.eid}_phoneview`)
      .find('.qrcode-inner')
      .empty()
      .qrcode(this.state.data);
    $(document).trigger('h5ds.setHistory');
  }, 500);

  componentDidMount() {
    // 渲染center 区域
    $(document).on(
      'h5ds.centerRenderEnd',
      debounce(() => {
        console.log('0000000000 重新渲染phone页面');
      }, 500)
    );
  }

  componentWillUnmount() {
    $(document).off('h5ds.centerRenderEnd');
  }

  render() {
    const { data } = this.state;
    return (
      <div className="h5dsLayerSet-qrcode">
        <TextArea onChange={this.changeTextArea} placeholder="请填写二维码代码" rows={8} value={data} />
      </div>
    );
  }
}
