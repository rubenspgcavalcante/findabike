import { connect } from "react-redux";
import { toggleMapFullscreen } from "../epics";
import { injectIntl } from "react-intl";
import StationsMap from "../components/StationsMap";

const mapStateToProps = ({
  app: { location, mapCenter },
  home: { network, fullscreenMap }
}) => ({
  location,
  mapCenter,
  network,
  fullscreenMap
});

const mapDispatchToProps = dispatch => ({
  toggleMapFullscreen: () => dispatch(toggleMapFullscreen())
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(StationsMap)
);
