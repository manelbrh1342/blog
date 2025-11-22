import React, { useState, useRef } from 'react';
import { Image, Smile, Paperclip, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Type } from 'lucide-react';

export default function BlogDashboard() {
  const [postContent, setPostContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [quoteMode, setQuoteMode] = useState(false);

  const executeCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      executeCommand('insertImage', url);
    }
  };

  const handleList = (ordered: boolean) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList', false);
    }
  };

  const handleQuote = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      if (quoteMode) {
        document.execCommand('insertText', false, '\u201D'); // closing quote
        setQuoteMode(false);
      } else {
        document.execCommand('insertText', false, '\u201C'); // opening quote
        setQuoteMode(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const currentNode = range.commonAncestorContainer;
        const li = currentNode.nodeType === Node.TEXT_NODE ? currentNode.parentElement : currentNode as Element;
        if (li && li.tagName === 'LI') {
          const list = li.parentElement;
          if (list && (list.tagName === 'UL' || list.tagName === 'OL')) {
            if (li.innerHTML.trim() === '') {
              // Exit list if empty
              e.preventDefault();
              const p = document.createElement('p');
              p.innerHTML = '<br>';
              list.parentElement?.insertBefore(p, list.nextSibling);
              const newRange = document.createRange();
              newRange.setStart(p, 0);
              newRange.setEnd(p, 0);
              selection.removeAllRanges();
              selection.addRange(newRange);
            } else {
              // Continue list
              e.preventDefault();
              const newLi = document.createElement('li');
              newLi.innerHTML = '<br>';
              li.insertAdjacentElement('afterend', newLi);
              const newRange = document.createRange();
              newRange.setStart(newLi, 0);
              newRange.setEnd(newLi, 0);
              selection.removeAllRanges();
              selection.addRange(newRange);
            }
          }
        }
      }
    }
  };

  const handleEmoji = () => {
    // Simulate Windows + . to open emoji picker
    const event = new KeyboardEvent('keydown', {
      key: '.',
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };



  const handleAttach = () => {
    const url = prompt('Enter link URL:');
    if (url && editorRef.current) {
      editorRef.current.focus();
      document.execCommand('createLink', false, url);
    }
  };

  const handlePost = () => {
    console.log('Post content:', postContent);
    // Here you can handle posting the content
  };

  return (
    
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* User Info */}
          <div className="flex items-start space-x-4 mb-6">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Cameron Williamson"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Cameron Williamson</h3>
              <p className="text-sm text-gray-500">Share your thoughts</p>
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex items-center space-x-1 mb-4 pb-4 border-b border-gray-200">
            <button
              onClick={() => executeCommand('formatBlock', 'p')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Paragraph"
            >
              <Type className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Upload Image"
            >
              <Image className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={handleQuote}
              className={`p-2 rounded transition-colors ${quoteMode ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              title="Quote"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4v10H3V10zm7 0h4v10h-4V10z" />
              </svg>
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
              onClick={() => executeCommand('justifyLeft')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Align Left"
            >
              <AlignLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => executeCommand('justifyCenter')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Align Center"
            >
              <AlignCenter className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => executeCommand('justifyRight')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Align Right"
            >
              <AlignRight className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => executeCommand('justifyFull')}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Justify"
            >
              <AlignJustify className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleList(false)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Bullet List"
            >
              <List className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleList(true)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Text Area */}
          <div
            ref={editorRef}
            contentEditable
            onInput={(e: React.FormEvent<HTMLDivElement>) => setPostContent((e.target as HTMLDivElement).innerHTML)}
            onKeyDown={handleKeyDown}
            data-placeholder="What's on your mind today?"
            className="w-full h-40 px-4 py-3 text-gray-700 resize-none focus:outline-none overflow-y-auto"
            style={{ minHeight: '160px' }}
          ></div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEmoji}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Emoji"
              >
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleAttach}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Link"
              >
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <button
              onClick={handlePost}
              className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>
  );
}