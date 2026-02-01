import { useState } from "react";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted");
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Share your experience..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
