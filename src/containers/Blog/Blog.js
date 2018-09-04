import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

class Blog extends Component {
    state = {
        auth: false
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
                            <Route path="/new-post" component={NewPost}/> :
                            null
                    }
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts"/>
                    {/* <Route path="/" component={Posts}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;