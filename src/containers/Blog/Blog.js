import React, {Component} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';

import './Blog.css';
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    exact
                                    activeClassName="active-home"
                                    activeStyle={{
                                        color: 'green',
                                        textDecoration: 'underline'
                                    }}
                                >Home</NavLink>
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
                <Route path="/" exact component={Posts}/>
                <Switch>
                    <Route path="/new-post" component={NewPost}/>{/* Putting NewPost before :id so that it won't be overwritten */}
                    <Route path="/:id" component={FullPost}/>{/* Flexible param :id */}
                </Switch>
            </div>
        );
    }
}

export default Blog;