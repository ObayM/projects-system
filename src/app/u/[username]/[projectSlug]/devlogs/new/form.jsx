"use client";

import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function CreateDevlogForm({ action }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  

  const [view, setView] = useState('write'); 


  return (
    <div className="bg-white border border-neutral-200  p-6 md:p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6 border-b border-neutral-200 pb-4">
        Create a New Devlog
      </h2>
      
      <form
        action={action}
        className="space-y-6"
        onSubmit={() => setSubmitting(true)}
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-neutral-600 rounded-md
             shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your project name :)"
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">
            Content <span className="text-red-600">*</span>
          </label>

          <div className="mt-2 border-b border-neutral-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              <button
                type="button"
                onClick={() => setView('write')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  view === 'write' ? 'border-blue-500 text-blue-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setView('preview')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  view === 'preview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Preview
              </button>
            </nav>
          </div>
          
          {view === 'write' ? (
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              required
              className="w-full p-3 border-x border-b border-neutral-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              placeholder="Share your progress, challenges, and successes (Markdown is supported)"
            />
          ) : (
            <div className="w-full min-h-[328px] p-3 border-x border-b border-neutral-300 rounded-b-md">

              <article className="prose prose-sm max-w-none prose-a:text-blue-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body || "*Start writing to see a preview of your content here.*"}
                </ReactMarkdown>
              </article>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-neutral-700">
            Cover Image <span className="text-neutral-500">(Optional URL)</span>
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-2 py-1 border border-neutral-600 rounded-md
              shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://something.cdn/image.png"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Link to an image that will be displayed at the top of your devlog!
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-200">
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="w-full sm:w-auto inline-flex justify-center rounded-full bg-blue-600 py-2 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Publishing..." : "Publish Devlog"}
          </button>
        </div>
      </form>
    </div>
  );
}