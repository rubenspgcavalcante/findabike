import { connect } from "react-redux";
import Home from "../components/Home";
import { citySelected, searchChange, suggestionsChange } from "../epics/index";
import { openModal } from "../../commons/epics/modal";

const mapStateToProps = ({
  app: { networks, place },
  home: { search, suggestions, searchLock }
}) => ({
  place,
  search,
  suggestions,
  searchLock,
  networks
});

const mapDispatchToProps = dispatch => ({
  citySelected: network => dispatch(citySelected(network)),
  searchChange: search => dispatch(searchChange(search)),
  suggestionsChange: suggestions => dispatch(suggestionsChange(suggestions)),
  showCredits: () => dispatch(openModal({ type: "Credits" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
