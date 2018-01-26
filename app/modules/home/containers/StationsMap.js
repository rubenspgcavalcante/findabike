import { connect } from "react-redux";
import { toggleMapFullscreen } from "../epics";
import StationsMap from "../components/StationsMap";

const mapStateToProps =
  ({ app: { location, mapCenter }, home: { network, fullscreenMap } }) => ({
    location, mapCenter, network, fullscreenMap
  });

const mapDispatchToProps = (dispatch) => ({
  toggleMapFullscreen: () => dispatch(toggleMapFullscreen())
});

export default connect(mapStateToProps, mapDispatchToProps)(StationsMap)