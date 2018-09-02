import React, {Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
            // Move the interceptors into constructor,
            // so that when the error happens before all children are rendered
            // errors can still be caught
            axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                });
                return request;
            });
            axios.interceptors.response.use(response => response, error => {
                this.setState({
                    error: error
                });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        };

        render() {
            return (
                <React.Fragment>
                    <Modal
                        show={this.state.error}
                        dismiss={this.errorConfirmedHandler}>
                        {
                            this.state.error ?
                                this.state.error.message :
                                null
                        }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    };
};

export default withErrorHandler;