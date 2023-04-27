import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
    postId,
    comment :{_id,text,name,avatar,user,date},
    auth,
    deleteComment
}) => {
  const onClick =(e)=>{
    console.log('delete comment was clicked');
    deleteComment(postId,_id);
  }
  return (
    <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`} >
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            {user === auth.user._id && (
                <button  onClick= {e=>onClick(e)}  
                    type="button"
                    class="btn btn-danger"
                  >  
                <i class="fas fa-times"></i>
                </button>
              )}
        </div>
    </div>
  )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}
const mapStateToProps = (state) =>({
    auth : state.auth
})
export default connect(mapStateToProps,{deleteComment})(CommentItem);