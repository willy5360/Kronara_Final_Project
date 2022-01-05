import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const Task = props => {


	return(
        <div className="list__task">
            <input type="checkbox" className="list__task__checkbox" />
            <li>{props.task.item}</li>
            <button
                    className="list__task__button"
                    type="button"
                    onClick={() => {
                        props.deleted(props.task.id);
                                                
                    }}>
                    <span><i className="far fa-trash-alt"></i></span>
                </button>
        </div>
	)
};

Task.propTypes = {
	task: PropTypes.object,
    deleted: PropTypes.func
 };
export default Task;
