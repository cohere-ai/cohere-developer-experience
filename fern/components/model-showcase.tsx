import React from 'react';

type IconComponent = React.ComponentType<{ className?: string }>;

// Local SVG icon components to avoid any external dependencies (e.g. lucide-react CDN).
// Each icon is a minimal, accessible SVG that uses currentColor for easy theming.
const IconCpu: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <rect x="8" y="8" width="8" height="8" rx="1" />
    <path d="M12 1v2" />
    <path d="M12 21v2" />
    <path d="M4 12H2" />
    <path d="M22 12h-2" />
  </svg>
);
const IconEye: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconShield: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2l7 3v6c0 5-3.8 9.7-7 11-3.2-1.3-7-6-7-11V5l7-3z" />
  </svg>
);
const IconFileText: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h8" />
    <path d="M8 9h4" />
  </svg>
);
const IconTool: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14.7 14.7L21 8.4l-4.2-4.2-6.3 6.3" />
    <path d="M7 17l-3 3 3 3 3-3" />
  </svg>
);
const IconCode: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconDollar: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 1v22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H15a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const IconList: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3" cy="6" r="1" />
    <circle cx="3" cy="12" r="1" />
    <circle cx="3" cy="18" r="1" />
  </svg>
);
const IconZap: IconComponent = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// Mapping capabilities to icons. Expand as needed.
const capabilityIconMap: Record<string, IconComponent> = {
  Reasoning: IconCode,
  Vision: IconEye,
  'Safety Modes': IconShield,
  Documents: IconFileText,
  'Tools Use': IconTool,
  'Structured Outputs': IconList,
};

type CardProps = {
  title: string;
  icon?: IconComponent;
  children: React.ReactNode;
};

const Card = ({ title, icon: Icon, children }: CardProps) => (
  <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-md">
    <div className="flex items-center mb-3 space-x-3">
      {Icon && <Icon className="w-6 h-6 text-gray-700" />}
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

type TagProps = {
  icon?: React.ComponentType<{ className?: string }>;
  label: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const Tag = ({ icon: Icon, label, className, ...rest }: TagProps) => (
  <span
    className={`inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium ${className ?? ''}`}
    {...rest}
  >
    {Icon ? <Icon className="w-4 h-4 text-gray-600" /> : null}
    {label}
  </span>
);

type TagListProps = { items: string[] };

const TagList = ({ items }: TagListProps) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item, idx) => {
      const Icon = capabilityIconMap[item] || IconCpu; // fallback icon
      return <Tag key={idx} icon={Icon} label={item} />;
    })}
  </div>
);

type Model = {
  name: string;
  description: string;
  longDescription?: string;
  capabilities: string[];
  pricing: { input: number; cachedInput: number; output: number };
  specs: { contextWindow: number; maxOutputTokens: number; knowledgeCutoff: string };
  endpoints: string[];
};

export const ModelShowcase = ({ model }: { model: Model }) => (
  <div className="max-w-5xl mx-auto p-8 space-y-6 font-sans">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <IconCpu className="w-8 h-8 text-indigo-600" />
          <span>{model.name}</span>
        </h1>
        <p className="text-gray-600 mt-1">{model.description}</p>
      </div>
      <div className="flex gap-3 items-center">
        <button className="px-4 py-2 rounded-lg border bg-white">Compare</button>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Try in Playground</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Capabilities */}
      <Card title="Capabilities" icon={IconEye}>
        <TagList items={model.capabilities} />
      </Card>

      {/* Pricing (compact card) */}
      <Card title="Pricing" icon={IconDollar}>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Input</p>
            <p className="text-lg font-semibold">${model.pricing.input}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cached Input</p>
            <p className="text-lg font-semibold">${model.pricing.cachedInput}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Output</p>
            <p className="text-lg font-semibold">${model.pricing.output}</p>
          </div>
        </div>
      </Card>

      {/* Specs */}
      <Card title="Specifications" icon={IconList}>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>Context Window:</strong> {model.specs.contextWindow.toLocaleString()} tokens</li>
          <li><strong>Max Output Tokens:</strong> {model.specs.maxOutputTokens.toLocaleString()}</li>
          <li><strong>Knowledge Cutoff:</strong> {model.specs.knowledgeCutoff}</li>
        </ul>
      </Card>

      {/* Endpoints */}
      <Card title="Endpoints" icon={IconZap}>
        <div className="flex flex-wrap gap-2">
          {model.endpoints.map((ep, i) => (
            <Tag key={i} label={ep} />
          ))}
        </div>
      </Card>
    </div>
  </div>
);
