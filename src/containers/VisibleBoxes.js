import {connect} from 'react-redux';

import {
  addBox,
  toggleBox,
  changeBoxColor
} from '../redux/actions';
import Boxes from '../components/Boxes/Boxes';

function getVisibleBoxes (boxes) {
  return boxes.filter(box=>box.visible);
};

const mapStateToProps = state => ({
  boxes: getVisibleBoxes(state.boxes)
});

const mapDispatchToProps = dispatch => ({
  onBoxClick: id => dispatch(toggleBox(id)),
  onAddClick: color => dispatch(addBox(color)),
  onColorChangeClick: (id, color) => dispatch(changeBoxColor(id, color))
});

const VisibleBoxes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Boxes);

export default VisibleBoxes;