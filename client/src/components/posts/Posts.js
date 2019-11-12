/**
 * Created by Kaizhi Du on 2019/11/11.
 */
import React, { Fragment, useEffect } from 'react';
import { getPosts } from '../../actions/posts';
import { connect } from 'react-redux';
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPosts, posts: {posts, loading} }) => {

    useEffect(() => {
        getPosts();
    }, [ getPosts ]);

    return loading ? <Spinner/> : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to the community
            </p>
            {posts.map(post => (
                    <PostItem key={post._id} post={post}/>
                )
            )}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);