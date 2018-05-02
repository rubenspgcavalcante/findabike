import { connect } from "react-redux";
import Toast from "../components/OfflineToast";

const mapStateToProps = ({ app: { offline } }) => ({ offline });

export default connect(mapStateToProps)(Toast);
