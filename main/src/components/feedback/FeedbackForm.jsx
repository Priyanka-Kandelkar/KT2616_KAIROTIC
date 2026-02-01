import { useState } from "react";
import { supabase } from "../../api/supabaseClient";
import "../../styles/FeedbackForm.css";

export default function FeedbackForm({ areaId = null }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) return;

    setLoading(true);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      alert("You must be logged in to submit feedback.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("feedback").insert({
      user_id: user.id,
      message: feedback,
      area_id: areaId,
    });

    if (error) {
      console.error("Feedback insert error:", error);
      alert("Failed to submit feedback");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setFeedback("");
    setLoading(false);
  };

  return (
    <div className="feedback-container">
      <h1>Feedback</h1>

      {submitted && (
        <p className="success-msg">Thank you! Your feedback has been submitted.</p>
      )}

      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          placeholder="Share your experience..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
