import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";
import "../../styles/CivilianFeedback.css";

export default function CivilianFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
  .from("feedback")
  .select(`
    id,
    message,
    created_at,
    profiles!feedback_user_id_fkey (
      email
    )
  `)
  .order("created_at", { ascending: false });


      if (error) {
        console.error("Error fetching feedback:", error);
      } else {
        setFeedbackList(data);
      }

      setLoading(false);
    };

    fetchFeedback();
  }, []);

  return (
    <div className="feedback-page">
      <h2 className="feedback-title">Civilian Feedback</h2>

      {loading && <p>Loading feedback...</p>}

      {!loading && feedbackList.length === 0 && (
        <p>No feedback submitted yet.</p>
      )}

      <div className="feedback-grid">
        {feedbackList.map((fb) => (
  <div key={fb.id} className="feedback-card">
    <p><strong>User:</strong> {fb.profiles?.email}</p>
    <p className="message">{fb.message}</p>
    <span className="date">
      {new Date(fb.created_at).toLocaleString()}
    </span>
  </div>
))}


      </div>
    </div>
  );
}
