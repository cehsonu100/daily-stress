'use client';

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";

const tagColors = {
  Facebook: "badge-primary badge-outline",
  Microsoft: "badge-secondary badge-outline",
  Amazon: "badge-accent badge-outline",
  Apple: "badge-neutral badge-outline",
  Adobe: "badge-success badge-outline",
  Uber: "badge-warning badge-outline",
  Google: "badge-error badge-outline",
};

export default function ClientSideComponent({ questionsWithStatus, session }) {
  const sortedQuestions = questionsWithStatus.sort((a, b) => a.id - b.id);
  const initialTags = Object.keys(tagColors);
  const [questions, setQuestions] = useState(sortedQuestions);
  const [selectedTags, setSelectedTags] = useState(initialTags);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = questions.filter((question) => {
      const matchesSearchQuery = question.problem
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesSelectedTags =
        selectedTags.length === 0 ||
        question.tags.some((tag) => selectedTags.includes(tag));

      return matchesSearchQuery && matchesSelectedTags;
    });
    setFilteredQuestions(filtered);
  }, [selectedTags, searchQuery, questions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  async function handleToggle(questionId, completed) {
    const userId = session.user.id;

    const { error } = await supabase.rpc("upsert_user_progress", {
      p_user_id: userId,
      p_question_id: questionId,
      p_completed: completed,
    });

    if (error) {
      console.error("Error updating progress:", error);
    } else {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, completed } : question
        )
      );
    }
  }

  function handleTagToggle(tag) {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex justify-between w-4/5 mb-4">
        <label className="flex items-center gap-2 input input-bordered">
          <input
            type="text"
            placeholder="Search..."
            className="grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        
        <div className="relative w-1/2 text-right" ref={dropdownRef}>
          <button
            className="w-full max-w-xs px-4 py-2 text-white bg-blue-500 rounded-lg select select-primary"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Select Tags
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-2xl max-h-60"
              style={{ maxHeight: "300px" }} // Adjust height to fit all items
            >
              {initialTags.map((tag, index) => (
                <label
                  key={index}
                  className="flex items-center p-2 transition-colors hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className="mr-2 checkbox checkbox-sm"
                    onChange={() => handleTagToggle(tag)}
                    checked={selectedTags.includes(tag)}
                  />
                  <span className={`badge ${tagColors[tag]}`}>{tag}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-4/5 overflow-x-auto">
        <table className="table w-full table-xs">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Problem Statement</th>
              <th>Topics</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((question) => (
              <tr key={question.id}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={question.completed}
                      onChange={() => handleToggle(question.id, !question.completed)}
                    />
                  </label>
                </td>
                <td>{question.id}</td>
                <td>
                  <a href={question.url} className="btn btn-ghost btn-xs btn-outline" target="_blank">
                    {question.problem}
                  </a>
                </td>
                <td>{question.topic}</td>
                <td>
                  {question.tags
                    .filter((tag) => selectedTags.includes(tag))
                    .map((tag, index) => (
                      <span
                        key={index}
                        className={`badge badge-sm ${tagColors[tag] || "badge-ghost badge-outline"}`}
                      >
                        {tag}
                      </span>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
