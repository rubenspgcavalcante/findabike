import {connect} from "react-redux";
import Toast from "../components/Toast";

const mapStateToProps = ({app: {offline}}) => ({offline});

export default connect(mapStateToProps)(Toast);