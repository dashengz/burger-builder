import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    // Since we are only checking props.show, not props.click,
    // we don't have to use PureComponent

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("Modal - getSnapshotBeforeUpdate");
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Modal - componentDidUpdate");
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} click={this.props.dismiss} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;