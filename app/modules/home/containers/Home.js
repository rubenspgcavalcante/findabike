import { connect } from "react-redux";
import Home from "../components/Home";
import { citySelected, searchChange, suggestionsChange } from "../epics/index";

const mapStateToProps = ({ app: { networks, location, place }, home: { search, suggestions, searchLock } }) => ({
  networks, location, place, search, suggestions, searchLock
});

const mapDispatchToProps = (dispatch) => ({
  citySelected: (id) => dispatch(citySelected(id)),
  searchChange: (search) => dispatch(searchChange(search)),
  suggestionsChange: (suggestions) => dispatch(suggestionsChange(suggestions))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)