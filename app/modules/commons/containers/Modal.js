import { connect } from "react-redux";
import Modal from "../components/Modal";

const mapStateToProps = ({ app: { modal } }) => ({ ...modal });

export default connect(mapStateToProps)(Modal);