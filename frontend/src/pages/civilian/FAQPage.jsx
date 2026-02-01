import React, { useState } from "react";
import "../../styles/FAQPage.css";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqSections = [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What is disaster preparedness?",
          answer:
            "Disaster preparedness involves planning and practicing how to respond during emergencies like earthquakes, floods, or cyclones.",
        },
        {
          question: "How do I participate in a test drill?",
          answer:
            "You can participate by selecting the Test Drill option on our website and following the instructions for your chosen disaster scenario.",
        },
      ],
    },
    {
      title: "Earthquake",
      faqs: [
        {
          question: "What should I do during an earthquake?",
          answer:
            "Stay calm, drop to the ground, take cover under a sturdy table or against an interior wall, and hold on until the shaking stops.",
        },
        {
          question: "How can I make my home earthquake-safe?",
          answer:
            "Secure heavy furniture to walls, place heavy items on lower shelves, and ensure that exits are clear. Consider retrofitting structures if necessary.",
        },
        {
          question: "What items should be in my earthquake emergency kit?",
          answer:
            "Include water, non-perishable food, first aid kit, flashlight, batteries, important documents, and a whistle to signal for help.",
        },
      ],
    },
    {
      title: "Cyclone",
      faqs: [
        {
          question: "How can I stay updated during a cyclone?",
          answer:
            "Follow official weather alerts, stay indoors, and have an emergency kit ready with food, water, and essentials.",
        },
        {
          question: "What precautions should I take before a cyclone hits?",
          answer:
            "Secure windows and doors, bring outdoor furniture inside, stock up on emergency supplies, and plan evacuation routes if necessary.",
        },
        {
          question: "What should I do if I need to evacuate during a cyclone?",
          answer:
            "Follow local authorities' instructions, move to a safe shelter, keep your emergency kit with you, and avoid flooded or blocked roads.",
        },
      ],
    },
    {
      title: "Flood",
      faqs: [
        {
          question: "How can I prepare for a flood?",
          answer:
            "Elevate electrical appliances, store valuables in waterproof containers, create an emergency plan, and know the local flood evacuation routes.",
        },
        {
          question: "What should I do during a flood?",
          answer:
            "Move to higher ground immediately, avoid walking or driving through floodwaters, and stay tuned to local news and alerts.",
        },
        {
          question: "What should I include in a flood emergency kit?",
          answer:
            "Keep water, food, first aid kit, flashlight, batteries, waterproof clothing, important documents, and medications ready.",
        },
      ],
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>

      {faqSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="faq-section">
          <h2>{section.title}</h2>

          <div className="faq-list">
            {section.faqs.map((faq, index) => {
              const faqKey = `${sectionIndex}-${index}`;

              return (
                <div
                  key={faqKey}
                  className={`faq-item ${
                    activeIndex === faqKey ? "active" : ""
                  }`}
                >
                  <div
                    className="faq-question"
                    onClick={() => toggleFAQ(faqKey)}
                  >
                    {faq.question}
                    <span className="faq-icon">
                      {activeIndex === faqKey ? "-" : "+"}
                    </span>
                  </div>

                  {activeIndex === faqKey && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQPage;
