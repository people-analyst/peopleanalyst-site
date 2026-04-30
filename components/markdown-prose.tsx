import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownProse({ children }: { children: string }) {
  return (
    <div className="research-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
