import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';

const CodeBlock = ({ language = 'javascript', code = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-devbot-border bg-devbot-surface">
      <div className="flex items-center justify-between px-4 py-2 bg-devbot-surface border-b border-devbot-border">
        <span className="text-xs font-mono text-devbot-muted uppercase tracking-wide">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded hover:bg-devbot-border transition-colors"
          title="Copy code"
        >
          {copied ? (
            <Check size={16} className="text-devbot-cyan" />
          ) : (
            <Copy size={16} className="text-devbot-muted hover:text-devbot-text" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        className="!bg-devbot-surface !m-0 !p-4 !text-xs sm:!text-sm"
        customStyle={{
          fontFamily: 'JetBrains Mono, monospace'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
