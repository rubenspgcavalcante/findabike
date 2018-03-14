import { connect } from "react-redux";
import Home from "../components/Home";
import { citySelected, searchChange, suggestionsChange } from "../epics/index";
import { openModal } from "../../commons/epics/modal";
import { locationRequest } from "../../commons/epics";

const mapStateToProps = ({
  app: { networks, place, location },
  home: { search, suggestions, searchLock, network }
}) => ({
  place,
  search,
  suggestions,
  searchLock,
  networks,
  network,
  currentLatLng: location
});

const mapDispatchToProps = dispatch => ({
  citySelected: network => dispatch(citySelected(network)),
  searchChange: search => dispatch(searchChange(search)),
  locationRequest: () => dispatch(locationRequest()),
  suggestionsChange: suggestions => dispatch(suggestionsChange(suggestions)),
  showCredits: () => dispatch(openModal({ type: "Credits" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
