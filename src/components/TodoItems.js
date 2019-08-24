import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../TodoItems.css'
import CheckIcon from '../images/checkIcon.svg'
import CheckIconCompleted from '../images/checkIcon-completed.svg'
import DeletedIcon from '../images/deletedIcon.svg'
let todolists = [];

let className;
let urlImage;

class TodoItems extends Component {
    constructor(props) {
        super(props);
        urlImage = CheckIcon;
        className = "todo-lists__text";
        this.classNameRemove = "todo-lists__remove";
    }

    render() {
        const {name, isCompleted} = this.props.items;
        //Check danh sách todo nếu việc nào xong rồi (true) thì hiển thị check completed và icon done
        if(isCompleted) {
            urlImage = CheckIconCompleted;
            className = `todo-lists__text todo-lists--completed`;
            this.classNameRemove = `todo-lists__remove`;
        }
        else {
            urlImage= CheckIcon;
            className = `todo-lists__text`;
            this.classNameRemove = `todo-lists__remove todo-lists--hide`;
        }
        return (
            <div className="todo-lists__items" ref={this.testRef}>
                <img 
                    // onClick={this.handlingWork} 
                    onClick={this.props.clickedItem} src={urlImage} />
                <p className={className}>{name}</p>
                <img className={this.classNameRemove} onClick={this.props.deletedItem} src={DeletedIcon} />
            </div>
        )   
    }
}

TodoItems.propTypes = {
    items: PropTypes.shape({
        name: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    }),
    deletedItem: PropTypes.func.isRequired,
    clickedItem: PropTypes.func.isRequired
}

export default TodoItems