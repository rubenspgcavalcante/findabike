import { connect } from "react-redux";
import LoadingBar from "../components/LoadingBar";

const mapStateToProps = ({ app: { loading } }) => ({ loading });

export default connect(mapStateToProps)(LoadingBar);