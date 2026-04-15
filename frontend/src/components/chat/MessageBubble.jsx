import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Avatar from '../ui/Avatar';
import CodeBlock from './CodeBlock';
import { formatTime } from '../../utils/helpers';

const MessageBubble = ({ message, index = 0 }) => {
  const isAi = message.isAi || message.senderId === 'ai';

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: index * 0.05 }
  };

  const components = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'javascript';
      const code = String(children).replace(/\n$/, '');

      if (inline) {
        return (
          <code className="bg-devbot-surface px-1.5 py-0.5 rounded text-devbot-cyan text-sm font-mono">
            {code}
          </code>
        );
      }

      return <CodeBlock language={language} code={code} />;
    },
    p: ({ children }) => <p className="mb-3 last:mb-0 text-devbot-text">{children}</p>,
    h1: ({ children }) => <h1 className="text-xl font-bold mb-2 text-devbot-text">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-bold mb-2 text-devbot-text">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-bold mb-1 text-devbot-text">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-3 text-devbot-text space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-3 text-devbot-text space-y-1">{children}</ol>,
    li: ({ children }) => <li className="ml-2">{children}</li>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-devbot-cyan hover:text-devbot-purple underline">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-devbot-purple pl-4 py-2 my-2 italic text-devbot-muted">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <table className="w-full border-collapse my-3 border border-devbot-border">
        {children}
      </table>
    ),
    th: ({ children }) => (
      <th className="border border-devbot-border bg-devbot-surface px-3 py-2 text-left text-devbot-text">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-devbot-border px-3 py-2 text-devbot-muted">
        {children}
      </td>
    )
  };

  return (
    <motion.div
      className={`flex gap-3 mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
    >
      {isAi && <Avatar isAi size="md" />}

      <div className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} max-w-xs sm:max-w-md lg:max-w-lg`}>
        <div
          className={`
            rounded-2xl px-4 py-3 break-words
            ${isAi
              ? 'bg-devbot-surface border border-devbot-border text-devbot-text'
              : 'bg-gradient-to-r from-devbot-purple to-devbot-cyan text-white'
            }
          `}
        >
          {isAi ? (
            <div className="prose prose-invert max-w-none text-sm">
              <ReactMarkdown components={components}>
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm">{message.content}</p>
          )}
        </div>

        <span className={`text-xs mt-1 ${isAi ? 'text-devbot-muted' : 'text-devbot-muted'}`}>
          {formatTime(message.createdAt)}
        </span>
      </div>

      {!isAi && <Avatar name={message.senderName || 'You'} size="md" />}
    </motion.div>
  );
};

export default MessageBubble;
