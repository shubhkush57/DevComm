import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

function ProfileExperience({experience:{
    company,title,location,current,to,from,description
}}) {
  console.log(company);
  return (
    <div>
        <h1>Profile Description</h1>
        <h3 className='text-dark'>{company}</h3>
        <p>
            <Moment className='YYYY/MM/DD'>{from}</Moment>{'- '}
            {!to ? 'Now':<Moment className='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p><strong>Position:</strong>{title}</p>
        <p><strong>Description:</strong>{description}</p>
    </div>
  )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default ProfileExperience;
