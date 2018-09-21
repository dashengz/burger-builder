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
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                });
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({
                    error: error
                });
            });
        }

        componentWillUnmount() {
            // to prevent our interceptors to be created and left dead in memory
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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