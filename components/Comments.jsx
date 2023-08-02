import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getComments } from '../services';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug)
      .then((result) => setComments(result));
  }, []);

  return (
    <div>
      {comments.length > 0 && (
      <div className="bg-white  shadow-lg rounded-lg p-7 mx-auto pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {comments.length}
          {' '}
          Comments
        </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-3 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span>
                {' '}
                on
                {' '}
                {moment(comment.updatedAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-gray-600 overflow-hidden ">{parse(comment.comment)}</p>
            </div>
          ))}
      </div>
      )}
    </div>
  );
};

export default Comments;
