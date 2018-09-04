import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import './Posts.css';
import FullPost from "../FullPost/FullPost";

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
                    <Link
                        to={'/posts/' + post.id}
                        key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            click={() => this.postSelectedHandler(post.id)}/>
                    </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;