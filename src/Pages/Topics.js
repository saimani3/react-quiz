// src/Topics.js

import React from 'react';
import './Topics.css'; // Import the CSS file for styling

function Topics() {
  const topics = [
    {
      subject: 'Mathematics (25 questions)',
      description: `Number system, BODMAS, Decimals, Fractions, LCM, HCF, Ratio and Proportion,
      Percentages, Mensuration, Time and Work; Time and Distance, Simple and Compound Interest,
      Profit and Loss, Algebra, Geometry and Trigonometry, Elementary Statistics, Square Root,
      Age Calculations, Calendar & Clock, Pipes & Cistern etc.`,
    },
    {
      subject: 'General Intelligence and Reasoning (25 questions)',
      description: `Analogies, Alphabetical and Number Series, Coding and Decoding, Mathematical operations,
      Relationships, Syllogism, Jumbling, Venn Diagram, Data Interpretation and Sufficiency,
      Conclusions and decision making, Similarities and differences, Analytical reasoning,
      Classification, Directions, Statement-Arguments and Assumptions etc.`,
    },
    {
      subject: 'General Science (40 questions)',
      description: `The syllabus under this shall cover Physics, Chemistry and Life Sciences of 10th standard level.`,
    },
    {
      subject: 'General Awareness (10 questions)',
      description: `On current affairs in science & technology, sports, culture, personalities, economics,
      politics and any other subject of importance.`,
    },
  ];

  return (
    <div className="topics">
      <h1>Syllabus for CBT for Technician Gr III</h1>
      {topics.map((topic, index) => (
        <div key={index} className="topic">
          <h2 className="topic-subject">{topic.subject}</h2>
          <p className="topic-description">{topic.description}</p>
        </div>
      ))}
      <a href='/test'><button className="start-test-button">Start Test</button></a>
    </div>
  );
}

export default Topics;
