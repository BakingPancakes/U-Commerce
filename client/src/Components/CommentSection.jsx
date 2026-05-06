import { useEffect, useState } from "react";
import { fetchListingCommentById, createListingComment } from "../api/listingsAPI";
import "./CommentSection.css";
import { useProfile } from "../contexts/UserHooks";

const CommentSection = ({ listingId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { profile } = useProfile();

  const [rating, setRating] = useState(null);

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
        commenter_id: profile.id,
        listing_id: listingId,
        comment: newComment,
        rating: rating,
      });

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
              <p className="comment-rating">
                {c.rating ? "⭐".repeat(c.rating) : "No rating"}
              </p>
              <p>{c.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {profile ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a comment..."
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <select
            value={rating || ""}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rating-select"
            required
          >
            <option value="">Select rating</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐ 2</option>
            <option value="3">⭐ 3</option>
            <option value="4">⭐ 4</option>
            <option value="5">⭐ 5</option>
          </select>
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p className="comment-login-message">
          You must be signed in to post a comment.
        </p>
      )}

    </section>
  );
};

export default CommentSection;
