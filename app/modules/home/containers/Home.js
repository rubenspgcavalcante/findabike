import { connect } from "react-redux";
import Home from "../components/Home";
import { citySelected } from "../epics/index";

const mapStateToProps = ({ app: { networks } }) => ({
  networks
});

const mapDispatchToProps = (dispatch) => ({
  citySelected: (id) => dispatch(citySelected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)