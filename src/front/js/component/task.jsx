import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	return(
	<div className="list__task">
		 <input type="checkbox" name className="list__task__checkbox" />
		 <li onClick={() => props.delete(props.id)}>{props.label}</li>
</div>
	)
};

Task.propTypes = {
label: PropTypes.string,
	delete: PropTypes.func,
id: PropTypes.string
 };
export default Task;
