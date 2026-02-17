import React from 'react';

interface MarkdownRendererProps {
    content: string;
    className?: string; // Additional classes
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
    if (!content) return null;

    // Split content by table blocks vs non-table blocks
    // This is complex. Let's process line by line or use a stronger regex.
    // Given the constraints and the simple structure in category-seo.ts (tables are distinct blocks),
    // we can use a simpler approach:
    // 1. Double newlines splitting into paragraphs.
    // 2. Identify if a paragraph starts with '|'. If so, treat as table.

    const paragraphs = content.split(/\n\n+/);

    const renderParagraph = (text: string, index: number) => {
        // Check for table structure
        if (text.trim().startsWith('|')) {
            const rows = text.trim().split('\n').filter(row => row.trim().length > 0);
            // row 0 is header, row 1 might be separator |---|
            const headers = rows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
            const bodyRows = rows.slice(1).filter(r => !r.includes('---'));

            return (
                <div key={index} className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <table className="min-w-full text-sm text-left rtl:text-right">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                {headers.map((h, i) => (
                                    <th key={i} className="px-6 py-3 font-bold border-b dark:border-gray-700">
                                        <InlineMarkdown text={h} />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {bodyRows.map((row, i) => {
                                const cells = row.split('|').filter(c => c.trim() !== ''); // Basic split, ignores escaped pipes
                                return (
                                    <tr key={i} className="bg-white border-b dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        {cells.map((cell, j) => (
                                            <td key={j} className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                <InlineMarkdown text={cell.trim()} />
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }

        // Regular paragraph handling
        // We handle newlines within paragraph as <br/>
        return (
            <div key={index} className={`mb-4 leading-relaxed ${className}`}>
                {text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        <InlineMarkdown text={line} />
                        {i < text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="markdown-content">
            {paragraphs.map((p, i) => renderParagraph(p, i))}
        </div>
    );
};

// Start small: Inline renderer for bold, links, etc.
const InlineMarkdown: React.FC<{ text: string }> = ({ text }) => {
    // We can use dangerouslySetInnerHTML here for simplicity on small strings
    // 1. Links: [text](url) -> <a ...>
    let html = text.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-300/30 underline-offset-2 transition-colors font-medium">$1</a>'
    );

    // 2. Bold: **text** -> <strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');

    // 3. Italic: *text* -> <em>
    html = html.replace(/\*([^\*]+)\*/g, '<em class="italic">$1</em>');

    // 4. Code: `text` -> <code>
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-pink-500">$1</code>');

    // 5. Lists (Bullet): - item (only if at start of string or preceded by break? NO, simple regex for now)
    // Actually, lists are usually handled at block level. 
    // Here we just handle line-start bullets if they appear in a "paragraph" context
    if (html.trim().startsWith('- ')) {
        html = `<span class="inline-flex items-start gap-2"><span class="text-blue-500 font-bold mt-1.5">•</span><span>${html.replace(/^- /, '')}</span></span>`;
    }

    // 6. Numbered Lists: 1. item
    if (/^\d+\./.test(html.trim())) {
        const match = html.match(/^(\d+)\.\s+(.*)/);
        if (match) {
            html = `<span class="inline-flex items-start gap-2"><span class="font-bold text-blue-600 dark:text-blue-400 min-w-[20px]">${match[1]}.</span><span>${match[2]}</span></span>`;
        }
    }

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};
