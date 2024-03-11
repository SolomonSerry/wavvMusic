import React, { useState } from 'react';

const Comment = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <textarea value={comment} onChange={handleCommentChange} />
      <div dangerouslySetInnerHTML={{ __html: comment }} />
    </div>
  );
};

export default Comment;