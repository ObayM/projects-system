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
    <div className="bg-neutral-800 border border-neutral-700  p-6 md:p-8 shadow-lg shadow-orange-900/30">
      <h2 className="text-2xl font-bold text-orange-400 mb-6 border-b border-neutral-700 pb-4">
        Scribe a New Scroll
      </h2>
      
      <form
        action={action}
        className="space-y-6"
        onSubmit={() => setSubmitting(true)}
      >

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-300">
            Scroll Title
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., 'The Soul-Binding Ritual is Complete'"
            maxLength={200}
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-neutral-300">
            The Scroll's Content <span className="text-orange-500">*</span>
          </label>

          <div className="mt-2 flex border-b border-neutral-600">
            <button
              type="button"
              onClick={() => setView('write')}
              className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
                view === 'write' ? 'bg-neutral-700 text-orange-400 border-t border-x border-neutral-600' : 'text-neutral-400 hover:bg-neutral-700/50'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setView('preview')}
              className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${
                view === 'preview' ? 'bg-neutral-700 text-orange-400 border-t border-x border-neutral-600' : 'text-neutral-400 hover:bg-neutral-700/50'
              }`}
            >
              Preview
            </button>
          </div>
          
          {view === 'write' ? (
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              required
              className="w-full p-3 bg-neutral-700 border-x border-b border-neutral-600 rounded-b-md text-neutral-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Chronicle your progress, the challenges overcome, the spirits appeased... Markdown is supported."
            />
          ) : (
            <div className="w-full min-h-[316px] p-3 bg-neutral-700 border-x border-b border-neutral-600 rounded-b-md text-neutral-200 shadow-sm">
              <article className="prose prose-invert prose-sm max-w-none prose-headings:text-orange-400 prose-a:text-lime-400 prose-blockquote:border-orange-600 prose-code:text-red-400">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body || "*Begin writing to see your incantation appear here...*"}
                </ReactMarkdown>
              </article>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-neutral-300">
            A Captured Vision <span className="text-neutral-500">(Image URL, Optional)</span>
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="https://catacomb.cdn/vision.png"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Capture a vision from the aether (via CDN) and bind its essence here.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 font-semibold cursor-pointer
             text-white bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 transition-colors
              disabled:bg-neutral-600 disabled:cursor-not-allowed"
          >
            {submitting ? "Scribing..." : "Commit to the Grimoire"}
          </button>
        </div>
      </form>
    </div>
  );
}