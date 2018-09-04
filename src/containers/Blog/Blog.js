import React, {Component} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';

import './Blog.css';
import Posts from "./Posts/Posts";

import asyncComponent from "../../hoc/asyncComponent/asyncComponent";
// import NewPost from "./NewPost/NewPost";
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    };

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts"
                                    exact
                                    activeClassName="active-home"
                                    activeStyle={{
                                        color: 'green',
                                        textDecoration: 'underline'
                                    }}
                                >Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post', // always going to be absolute path!
                                    // if you want relative path, then you need to build the path
                                    // using this.props.match.url
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {
                        // If not authenticated then don't output new post
                        // Routing is essentially as rendering components
                        this.state.auth ?
                            <Route path="/new-post" component={AsyncNewPost}/> :
                            null
                    }
                    <Route path="/posts" component={Posts}/>

                    {/* Handle 404: Route component without a path, can do 'render' or 'component' */}
                    <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>Not Found!</h1>}/>
                    {/* One way to handle 404 fallback: <Redirect from="/" to="/posts"/> */}
                    {/* Catch all url and render posts: <Route path="/" component={Posts}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;