import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({getPost,post: {post,loading}})=> {
    const { id } = useParams();
    useEffect(()=>{
        getPost(id)
    },[getPost,id]);
   
  return (<Fragment>
     <Link to = '/posts' className='btn'>Back To Posts</Link>
    {(loading === true || post === null) ?<Spinner/>:
    <Fragment>
        <PostItem key = {post._id} post = {post} showActions = {false}/>
        <CommentForm postId={post._id} />
        <div className='comments'>
        {console.log(post.comments)}
        {post.comments.map(comment =>(
            <CommentItem key = {comment._id}   postId = {post._id} comment = {comment}/>
        ))}
        </div>
    </Fragment>
    }
  </Fragment>
   
  )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    post: state.post
})
export default connect(mapStateToProps,{getPost})(Post);