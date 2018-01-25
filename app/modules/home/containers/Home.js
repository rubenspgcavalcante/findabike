import { connect } from "react-redux";
import Home from "../components/Home";
import { citySelected, searchChange, suggestionsChange } from "../epics/index";

const mapStateToProps = ({ app: { networks, location, mapCenter, place }, home: { search, suggestions, searchLock, network } }) => ({
  networks, location, mapCenter, place, search, suggestions, searchLock, network
});

const mapDispatchToProps = (dispatch) => ({
  citySelected: (network) => dispatch(citySelected(network)),
  searchChange: (search) => dispatch(searchChange(search)),
  suggestionsChange: (suggestions) => dispatch(suggestionsChange(suggestions))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)