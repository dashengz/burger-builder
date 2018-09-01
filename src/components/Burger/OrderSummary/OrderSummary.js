import React, {Component} from 'react';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("OrderSummary - getSnapshotBeforeUpdate");
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("OrderSummary - componentDidUpdate");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(key => {
                return (
                    <li key={key}>
                        <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                    </li>
                );
            });
        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button type="Danger" click={this.props.cancel}>CANCEL</Button>
                <Button type="Success" click={this.props.checkout}>CONTINUE</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;