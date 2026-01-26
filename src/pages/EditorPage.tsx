import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import type { ContentEditableEvent } from 'react-simple-wysiwyg';

export default function EditorPage() {
  const [html, setHtml] = useState('my <b>HTML</b>');

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold mb-3">Editor</h1>
      <Editor value={html} onChange={onChange} />
    </div>
  );
}