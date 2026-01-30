"use client";

import { Topic } from "@/types/fiqh";

interface TopicFilterProps {
  topics: Topic[];
  selectedTopic: string | null;
  onSelectTopic: (topicId: string | null) => void;
}

export default function TopicFilter({ topics, selectedTopic, onSelectTopic }: TopicFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onSelectTopic(null)}
        className={`px-4 py-2 rounded-full font-medium transition-all ${
          selectedTopic === null
            ? "bg-emerald-600 text-white shadow-md"
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        All Topics
      </button>
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onSelectTopic(topic.id)}
          className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
            selectedTopic === topic.id
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <span>{topic.icon}</span>
          <span>{topic.name}</span>
          <span className="text-xs opacity-75">({topic.questionCount})</span>
        </button>
      ))}
    </div>
  );
}
