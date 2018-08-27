import React, {Component} from 'react';

// const withClass = (WrappedComponent, classes) => {
//     return (props) => {
//         return (
//             <div className={classes}>
//                 <WrappedComponent {...props} /> {/* Spread the props into key value pairs */}
//             </div>
//         );
//     };
// };

// HOC can also be stateful components
// const withClass = (WrappedComponent, classes) => {
//     return class extends Component {
//         componentDidMount() {
//             console.log('HOC - withClass - componentDidMount');
//         }
//         render() {
//             return (
//                 <div className={classes}>
//                     <WrappedComponent {...this.props} />
//                 </div>
//             );
//         }
//     };
// };

// To solve the forwarded ref issue
const withClass = (WrappedComponent, classes) => {
    const WithClass = class extends Component {
        componentDidMount() {
            console.log('HOC - withClass - componentDidMount');
        }
        render() {
            return (
                <div className={classes}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            );
        }
    };
    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />;
    });
};

export default withClass;