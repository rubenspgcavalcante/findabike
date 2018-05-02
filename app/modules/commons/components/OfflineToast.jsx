import React, { PureComponent } from "react";
import { bool } from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { toast, ToastContainer } from "react-toastify";

const message = () => (
  <div>
    <i className="fa fa-warning" />&nbsp;<FormattedMessage id="app.offline" />
  </div>
);

export default class OfflineToast extends PureComponent {
  static propTypes = {
    offline: bool
  };

  toastId = null;

  static _showMessage(offline) {
    const { BOTTOM_RIGHT } = toast.POSITION;
    if (toast.isActive(this.toastId)) {
      return;
    }

    return offline
      ? (this.toastId = toast(message, {
          position: BOTTOM_RIGHT,
          closeButton: false,
          autoClose: false,
          closeOnClick: false,
          className: classNames("toast", { offline })
        }))
      : toast.dismiss();
  }

  componentDidMount() {
    OfflineToast._showMessage(this.props.offline);
  }

  componentWillReceiveProps({ offline }) {
    OfflineToast._showMessage(offline);
  }

  render() {
    return <ToastContainer />;
  }
}
