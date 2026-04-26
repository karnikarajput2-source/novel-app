'use client'
import { useState, useEffect } from "react";

export default function App() {
 type Chapter = {
  title: string;
  content: string;
  goal: string;
  conflict: string;
  outcome: string;
};

const [chapters, setChapters] = useState<Chapter[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [goal, setGoal] = useState("");
  const [conflict, setConflict] = useState("");
  const [outcome, setOutcome] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("novel");
    if (saved) setChapters(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("novel", JSON.stringify(chapters));
  }, [chapters]);

  const saveChapter = () => {
    setChapters([...chapters, { title, content, goal, conflict, outcome }]);
    setTitle("");
    setContent("");
    setGoal("");
    setConflict("");
    setOutcome("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Novel</h1>

      <input placeholder="Chapter Title" value={title} onChange={e => setTitle(e.target.value)} />

      <input placeholder="Scene Goal" value={goal} onChange={e => setGoal(e.target.value)} />
      <input placeholder="Conflict" value={conflict} onChange={e => setConflict(e.target.value)} />
      <input placeholder="Outcome" value={outcome} onChange={e => setOutcome(e.target.value)} />

      <textarea placeholder="Write..." value={content} onChange={e => setContent(e.target.value)} />

      <button onClick={saveChapter}>Save</button>

      <h2>Chapters</h2>
      {chapters.map((c, i) => (
        <div key={i}>
          <h3>{c.title}</h3>
          <p>{c.goal}</p>
        </div>
      ))}
    </div>
  );
}