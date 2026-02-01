import { useState } from "react";
import "./DrillSelector.css";


const quizData = {
  earthquake: [
    {
      q: "What is the safest action during an earthquake?",
      options: [
        "Run outside immediately",
        "Drop, Cover, Hold On",
        "Stand near a window",
        "Use an elevator"
      ],
      a: 1,
      explain:
        "Running or using elevators is dangerous due to falling debris. Drop, Cover, and Hold On protects you from injuries."
    },
    {
      q: "Where should you take shelter indoors?",
      options: [
        "Balcony",
        "Under a sturdy table",
        "Near glass windows",
        "In the doorway"
      ],
      a: 1,
      explain:
        "A sturdy table shields you from falling objects. Glass and balconies are extremely unsafe."
    },
    {
      q: "What should you do after the shaking stops?",
      options: [
        "Immediately leave the building",
        "Check for injuries and hazards",
        "Light a match",
        "Use the elevator"
      ],
      a: 1,
      explain:
        "Checking for injuries and gas leaks prevents further harm. Elevators and flames can be dangerous."
    },
    {
      q: "Which hazard often follows a major earthquake?",
      options: [
        "Heatwave",
        "Aftershocks",
        "Cyclone",
        "Tornado"
      ],
      a: 1,
      explain:
        "Aftershocks are common and can cause additional damage, so staying alert is important."
    },
    {
      q: "If you are outdoors during an earthquake, what is safest?",
      options: [
        "Stand near buildings",
        "Move to an open area",
        "Hide under a bridge",
        "Enter a nearby building"
      ],
      a: 1,
      explain:
        "Open areas reduce the risk of falling debris, unlike buildings or bridges."
    },
    {
      q: "What should you do if you smell gas after an earthquake?",
      options: [
        "Turn on lights",
        "Ignore it",
        "Turn off gas and ventilate",
        "Use a candle"
      ],
      a: 2,
      explain:
        "Gas leaks can cause fires or explosions. Turning off gas and ventilating reduces risk."
    },
    {
      q: "Which item is important in an earthquake emergency kit?",
      options: [
        "Perfume",
        "Flashlight",
        "Mirror",
        "Laptop"
      ],
      a: 1,
      explain:
        "A flashlight is crucial during power outages to navigate safely."
    },
    {
      q: "Why should elevators be avoided after earthquakes?",
      options: [
        "They are slow",
        "They may get stuck",
        "They are noisy",
        "They waste power"
      ],
      a: 1,
      explain:
        "Power failures can trap people inside elevators, making them unsafe."
    }
  ],

  flood: [
    {
      q: "What is the safest response during a flood?",
      options: [
        "Drive through water",
        "Move to higher ground",
        "Stay in the basement",
        "Walk through shallow water"
      ],
      a: 1,
      explain:
        "Higher ground reduces the risk of drowning and fast-moving water."
    },
    {
      q: "Why should flood water be avoided?",
      options: [
        "It is cold",
        "It may contain sewage and electricity",
        "It smells bad",
        "It slows movement"
      ],
      a: 1,
      explain:
        "Flood water can carry electrical currents, debris, and disease-causing contaminants."
    },
    {
      q: "When should electricity be turned off during floods?",
      options: [
        "Never",
        "Before water enters the house",
        "After flooding ends",
        "Only at night"
      ],
      a: 1,
      explain:
        "Turning off electricity early prevents electrocution."
    },
    {
      q: "Which water is safe to drink after a flood?",
      options: [
        "Tap water",
        "River water",
        "Boiled or treated water",
        "Rainwater"
      ],
      a: 2,
      explain:
        "Boiled or treated water reduces the risk of waterborne diseases."
    },
    {
      q: "What should you do if trapped in a flooded building?",
      options: [
        "Go to the lowest floor",
        "Climb to higher floors",
        "Jump into water",
        "Wait in the basement"
      ],
      a: 1,
      explain:
        "Higher floors reduce exposure to rising water."
    },
    {
      q: "When is it safe to return home after a flood?",
      options: [
        "Immediately",
        "When water recedes",
        "After authority clearance",
        "At night"
      ],
      a: 2,
      explain:
        "Authorities ensure structures and utilities are safe before return."
    },
    {
      q: "What footwear is best during floods?",
      options: [
        "Barefoot",
        "Slippers",
        "Sturdy boots",
        "Socks"
      ],
      a: 2,
      explain:
        "Sturdy boots protect feet from sharp debris and contamination."
    },
    {
      q: "Why is driving during floods dangerous?",
      options: [
        "Poor visibility",
        "Road damage and strong currents",
        "Fuel shortage",
        "Traffic police fines"
      ],
      a: 1,
      explain:
        "Even shallow water can sweep vehicles away or hide damaged roads."
    }
  ],

  cyclone: [
    {
      q: "What should you do when a cyclone warning is issued?",
      options: [
        "Go outside to check",
        "Secure house and emergency kit",
        "Ignore the warning",
        "Travel to another city"
      ],
      a: 1,
      explain:
        "Preparation reduces damage and ensures safety during strong winds."
    },
    {
      q: "Where should you stay during a cyclone?",
      options: [
        "Balcony",
        "Near windows",
        "Inside a safe room",
        "Outside"
      ],
      a: 2,
      explain:
        "Safe rooms protect against flying debris and strong winds."
    },
    {
      q: "What should be avoided during a cyclone?",
      options: [
        "Listening to alerts",
        "Charging phone",
        "Standing near windows",
        "Staying indoors"
      ],
      a: 2,
      explain:
        "Windows can shatter due to strong winds and pressure."
    },
    {
      q: "Is it safe to go out during the eye of a cyclone?",
      options: [
        "Yes",
        "No",
        "Sometimes",
        "Only in daylight"
      ],
      a: 1,
      explain:
        "The calm eye is temporary; severe winds return suddenly."
    },
    {
      q: "What should be checked after a cyclone?",
      options: [
        "Power lines",
        "TV signal",
        "Road signs",
        "Internet speed"
      ],
      a: 0,
      explain:
        "Downed power lines are extremely dangerous after storms."
    },
    {
      q: "Why should loose outdoor items be secured?",
      options: [
        "To save space",
        "They can become projectiles",
        "To avoid rust",
        "To reduce noise"
      ],
      a: 1,
      explain:
        "Strong winds can turn loose objects into dangerous flying debris."
    },
    {
      q: "Which supply is essential in a cyclone emergency kit?",
      options: [
        "Candles",
        "First-aid kit",
        "Decor items",
        "Extra clothes only"
      ],
      a: 1,
      explain:
        "First-aid kits help treat injuries when help is delayed."
    },
    {
      q: "What should you do if evacuation is ordered?",
      options: [
        "Wait and watch",
        "Follow official evacuation routes",
        "Hide at home",
        "Travel randomly"
      ],
      a: 1,
      explain:
        "Official routes are planned for safety and congestion management."
    }
  ]
};


export default function DrillSelector() {

  const [selectedDrill, setSelectedDrill] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const quiz = selectedDrill ? quizData[selectedDrill] : [];

  function resetAll() {
    setSelectedDrill(null);
    setQuizStarted(false);
    setQIndex(0);
    setScore(0);
    setFinished(false);
    setShowFeedback(false);
    setSelectedOption(null);
  }


  if (!selectedDrill) {
    return (
      <div className="drill-container">
        <h3>Select Disaster Drill</h3>

        <div className="drill-cards">
          <button className="card earthquake" onClick={() => setSelectedDrill("earthquake")}>
            🌍 Earthquake
          </button>
          <button className="card flood" onClick={() => setSelectedDrill("flood")}>
            🌊 Flood
          </button>
          <button className="card cyclone" onClick={() => setSelectedDrill("cyclone")}>
            🌀 Cyclone
          </button>
        </div>
      </div>
    );
  }


if (!quizStarted) {
  return (
    <div className="detail-page">
      <span className="close-btn" onClick={resetAll}>✖</span>

      {selectedDrill === "earthquake" && (
        <>
          <h3>🌍 EARTHQUAKE DRILL</h3>

          <h4>🕒 Before an Earthquake</h4>
          <ul>
            <li>Identify safe spots like under sturdy tables or interior walls.</li>
            <li>Secure heavy furniture and appliances to walls.</li>
            <li>Prepare an emergency kit with water, flashlight, and first aid.</li>
            <li>Learn how to turn off gas, water, and electricity.</li>
            <li>Practice “Drop, Cover, Hold On” regularly.</li>
          </ul>

          <h4>⚡ During an Earthquake</h4>
          <ul>
            <li><strong>Drop</strong> to your hands and knees.</li>
            <li><strong>Cover</strong> your head and neck under sturdy furniture.</li>
            <li><strong>Hold On</strong> until the shaking stops.</li>
            <li>Stay away from windows, mirrors, and heavy objects.</li>
            <li>Do not run outside or use elevators.</li>
            <li>If outdoors, move to an open area away from buildings.</li>
          </ul>

          <h4>🧯 After an Earthquake</h4>
          <ul>
            <li>Check yourself and others for injuries.</li>
            <li>Expect aftershocks and stay alert.</li>
            <li>Turn off gas if you smell a leak.</li>
            <li>Avoid damaged buildings.</li>
            <li>Follow official instructions and move to shelters if needed.</li>
          </ul>
        </>
      )}

      {selectedDrill === "flood" && (
        <>
          <h3>🌊 FLOOD DRILL</h3>

          <h4>🕒 Before a Flood</h4>
          <ul>
            <li>Monitor weather alerts and flood warnings.</li>
            <li>Identify higher ground and evacuation routes.</li>
            <li>Keep documents in waterproof bags.</li>
            <li>Store drinking water and food.</li>
            <li>Move valuables and electronics to higher levels.</li>
          </ul>

          <h4>🌧️ During a Flood</h4>
          <ul>
            <li>Move to higher ground immediately.</li>
            <li>Do not walk or drive through flood water.</li>
            <li>Stay away from electric poles and wires.</li>
            <li>Follow evacuation orders strictly.</li>
            <li>Keep children and pets away from water.</li>
          </ul>

          <h4>🧼 After a Flood</h4>
          <ul>
            <li>Return home only after official clearance.</li>
            <li>Avoid contact with flood water.</li>
            <li>Drink only boiled or treated water.</li>
            <li>Clean and disinfect flooded areas.</li>
            <li>Check electrical systems before switching power on.</li>
          </ul>
        </>
      )}

      {selectedDrill === "cyclone" && (
        <>
          <h3>🌀 CYCLONE DRILL</h3>

          <h4>🕒 Before a Cyclone</h4>
          <ul>
            <li>Secure doors, windows, and loose outdoor items.</li>
            <li>Prepare an emergency kit with food, water, torch, and radio.</li>
            <li>Charge mobile phones and power banks.</li>
            <li>Identify the safest room in your house.</li>
            <li>Evacuate early if authorities advise.</li>
          </ul>

          <h4>🌬️ During a Cyclone</h4>
          <ul>
            <li>Stay indoors in a safe room.</li>
            <li>Keep away from windows and glass doors.</li>
            <li>Do not go outside, even if it becomes calm (eye of storm).</li>
            <li>Switch off electrical appliances.</li>
            <li>Listen to official updates.</li>
          </ul>

          <h4>🔧 After a Cyclone</h4>
          <ul>
            <li>Avoid fallen power lines.</li>
            <li>Check for structural damage before entering buildings.</li>
            <li>Use safe drinking water only.</li>
            <li>Report damage to authorities.</li>
            <li>Help others if it is safe to do so.</li>
          </ul>
        </>
      )}

      <button
        className="start-quiz-btn"
        onClick={() => setQuizStarted(true)}
      >
        🧠 Test Your Preparedness
      </button>
    </div>
  );
}


  /* ================= QUIZ ================= */

  if (!finished) {
    const currentQ = quiz[qIndex];

    return (
      <div className="detail-page">
        <span className="close-btn" onClick={resetAll}>✖</span>

        <h3>Preparedness Quiz</h3>
        <p>Question {qIndex + 1} of {quiz.length}</p>
        <h4>{currentQ.q}</h4>

        {!showFeedback ? (
          currentQ.options.map((op, i) => (
            <button
              key={i}
              className={`option-btn ${showFeedback
                  ? i === currentQ.a
                    ? "correct"
                    : i === selectedOption
                      ? "wrong"
                      : ""
                  : ""
                }`}
              onClick={() => {
                setSelectedOption(i);
                if (i === currentQ.a) setScore(score + 1);
                setShowFeedback(true);
              }}
            >

              {op}
            </button>
          ))
        ) : (
          <div className="feedback-box">
            {selectedOption === currentQ.a ? (
              <p className="correct">✅ Correct!</p>
            ) : (
              <>
                <p className="wrong">❌ Incorrect</p>
                <p><strong>Correct Answer:</strong> {currentQ.options[currentQ.a]}</p>
                <p className="explain">{currentQ.explain}</p>
              </>
            )}

            <button
              className="next-btn"
              onClick={() => {
                setShowFeedback(false);
                setSelectedOption(null);

                if (qIndex + 1 < quiz.length) {
                  setQIndex(qIndex + 1);
                } else {
                  setFinished(true);
                }
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ================= RESULT ================= */

  return (
    <div className="detail-page">
      <h3>Drill Completed ✅</h3>
      <p>Your Score: <strong>{score} / {quiz.length}</strong></p>

      <button className="retry-btn" onClick={resetAll}>
        🔁 Try Another Drill
      </button>
    </div>
  );
}
