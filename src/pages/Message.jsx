import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const DEMO_THREADS = [
  {
    id: 1,
    name: "TechFlow Recruiting",
    preview: "Thanks for applying! We'd like to schedule a call...",
    messages: [
      { from: "them", text: "Hi! Thanks for applying to the Frontend Intern role." },
      { from: "them", text: "We'd love to schedule a quick intro call this week." },
    ],
  },
  {
    id: 2,
    name: "InternHub Support",
    preview: "Welcome to InternHub! Here's how to get started...",
    messages: [
      { from: "them", text: "Welcome to InternHub! Let us know if you have any questions." },
    ],
  },
];

function Message() {
  const navigate = useNavigate();
  const [activeThread, setActiveThread] = useState(DEMO_THREADS[0]);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState(DEMO_THREADS);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;

    // NOTE: No messaging endpoint exists on the backend yet — this only
    // appends locally so the conversation UI can be demonstrated.
    const updatedThreads = threads.map((t) =>
      t.id === activeThread.id
        ? { ...t, messages: [...t.messages, { from: "me", text: draft.trim() }] }
        : t
    );
    setThreads(updatedThreads);
    setActiveThread(updatedThreads.find((t) => t.id === activeThread.id));
    setDraft("");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>
        <button
          onClick={() => navigate("/student-dashboard")}
          className="text-blue-700 font-semibold hover:underline"
        >
          Back to Dashboard
        </button>
      </header>

      <div className="px-8 pt-6">
        <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
          Demo conversations — messaging isn't connected to the backend yet
        </span>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-8 py-6 grid md:grid-cols-3 gap-6">
        {/* THREAD LIST */}
        <div className="bg-white rounded-3xl shadow-sm p-4 h-fit">
          <h2 className="text-xl font-bold px-3 py-2 mb-2">Messages</h2>

          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setActiveThread(thread)}
              className={`w-full text-left px-4 py-4 rounded-2xl mb-2 transition ${
                activeThread.id === thread.id ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <p className="font-bold">{thread.name}</p>
              <p className="text-gray-500 text-sm truncate">{thread.preview}</p>
            </button>
          ))}
        </div>

        {/* CONVERSATION */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-sm flex flex-col h-[600px]">
          <div className="px-6 py-5 border-b">
            <h3 className="text-xl font-bold">{activeThread.name}</h3>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {activeThread.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-5 py-3 rounded-2xl ${
                    msg.from === "me"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t flex gap-3">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-5 py-3 outline-none"
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Message;
