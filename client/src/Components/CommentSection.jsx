import { useState } from "react";
import "./CommentSection.css";

const CommentSection = ({ listingId }) => {
  const [comments, setComments] = useState([
    { id: 1, author: "Alice", text: "Is this still available?" },
    { id: 2, author: "Bob", text: "Can you share more pictures?" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Current User",
      text: newComment,
      listingId,
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <section className="comments-section">
      <h2>Comments</h2>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p className="comment-author">{comment.author}</p>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment..."
          rows="4"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post Comment</button>
      </form>
    </section>
  );
};

export default CommentSection;