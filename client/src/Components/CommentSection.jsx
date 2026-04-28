import { useEffect, useState } from "react";
import { fetchListingCommentById, createListingComment } from "../api/listingsAPI";
import "./CommentSection.css";

const CommentSection = ({ listingId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments when listingId changes
  useEffect(() => {
    async function loadComments() {
      try {
        const data = await fetchListingCommentById(listingId);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    }

    loadComments();
  }, [listingId]);

  // Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createListingComment({
        commenter_id: "f82c260a-3c04-43d9-995f-7670c184cd6c",
        listing_id: listingId,
        comment: newComment,
        rating: null,
      });

      // Refresh the page to reload comments with correct username
      window.location.reload();
    } catch (err) {
      console.error("Failed to create comment:", err);
    }
  };
  
  return (
    <section className="comments-section">
      <h2>Comments</h2>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="comment-card">
              <p className="comment-author">{c.users?.name || "Unknown User"}</p>
              <p>{c.comment}</p>
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
