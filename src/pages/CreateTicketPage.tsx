import { useState } from "react";
import Editor from "../components/Editor";
import { Input } from "../components";

export default function CreateTicketPage() {
  const [content, setContent] = useState("my <b>HTML</b>");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(0);

  const handleShowOutput = () => {
    setOutput(content);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold mb-3">Create a support ticket</h1>
      <Input value={title} label="Title" placeholder="Enter ticket title" className="mb-4" onChange={e => setTitle(e.target.value)} />
      <Editor
        content={content}
        setContent={setContent}
      />
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={handleShowOutput}
      >
        Show Output
      </button>
      <div className="mt-4 p-4 border rounded bg-gray-50 dark:bg-gray-800 dark:text-white">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  );
}
