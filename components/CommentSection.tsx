
import React, { useState, useMemo } from 'react';
import { Comment } from '../types.ts';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  onDeleteComment: (id: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment, onDeleteComment }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState('');

  // Simple CAPTCHA logic
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { question: `${a} + ${b} = ?`, answer: (a + b).toString() };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!author.trim() || !content.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (captchaAnswer !== captcha.answer) {
      setError('Incorrect verification answer.');
      return;
    }

    onAddComment({ author, content });
    setAuthor('');
    setContent('');
    setCaptchaAnswer('');
  };

  return (
    <div className="mt-12 pt-12 border-t border-slate-800">
      <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
        <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        Discussion ({comments.length})
      </h4>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Display Name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-200 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Verification: {captcha.question}</label>
            <input
              type="text"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Answer"
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-200 text-sm"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Message</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-200 text-sm resize-none"
          />
        </div>
        {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
        <button
          type="submit"
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold transition-colors"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-slate-500 text-center italic py-4">No comments yet. Be the first to start the conversation!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-400 font-bold text-xs uppercase">
                {comment.author.charAt(0)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{comment.author}</span>
                    <span className="text-slate-500 text-[10px] font-mono">{comment.timestamp}</span>
                    {comment.isAdmin && (
                      <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[8px] font-bold uppercase">Admin</span>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-400 transition-all"
                    title="Delete Comment"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed bg-slate-900/30 p-4 rounded-2xl rounded-tl-none border border-slate-800/50">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
