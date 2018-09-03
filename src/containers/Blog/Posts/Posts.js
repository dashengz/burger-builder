import React, {Component} from 'react';
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null
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
        this.setState({
            selectedPostId: id
        });
    };

    render() {
        let posts = <p style={{
            textAlign: 'center'
        }}>Something went wrong!</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        {...this.props /* One way to pass props down to components */}
                        match={this.props.match /* One way to pass selected props down to components */}
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