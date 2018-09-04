import React, { Component } from 'react';
import axios from '../../../axios'; // using the instance from axios.js

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidUpdate() {
        this.loadPost();
    }

    componentDidMount() {
        console.log(this.props);
        this.loadPost();
    }

    loadPost() {
        if (this.props.match.params.id && // if id is not null
            (!this.state.loadedPost || // if there is no loaded post
                (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id))) { // if the loaded post id is not the id that's clicked
            axios.get('/posts/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        loadedPost: response.data
                    });
                });
        }
    };

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    };

    render () {
        let post = <p style={{
            textAlign: 'center'
        }}>Please select a Post!</p>;

        if (this.props.id) {
            post = <p style={{
                textAlign: 'center'
            }}>Loading...</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button
                            className="Delete"
                            onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;