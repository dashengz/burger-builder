import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        console.log(this.props);
        axios.get("/posts")
            .then(response => {
                const transformedData = response.data.slice(0, 4).map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    };
                });
                this.setState({
                    posts: transformedData
                });
            })
            .catch(error => {
                console.log(error)
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({
            pathname: '/' + id
        });
        // or
        // this.props.history.push('/' + id);
    };

    render() {
        let posts = <p style={{
            textAlign: 'center'
        }}>Something went wrong!</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        title={post.title}
                        author={post.author}
                        click={() => this.postSelectedHandler(post.id)}/>
                );
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;