import React from 'react';

type IconComponent = React.ComponentType<{ className?: string, size?: number, stroke?: number }>;

const IconEye: IconComponent = ({size=16, stroke=1.5}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} width={size} height={size} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconSparkles: IconComponent = ({size=16, stroke=1.5}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke}stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
);
const IconShield: IconComponent = ({size=16, stroke=1.5}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);
const IconFileText: IconComponent = ({size=16, stroke=1.5}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);

const IconThinking: IconComponent = ({size=16, stroke=1.5}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
)

const IconCode: IconComponent = ({size=16, stroke=1.5}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round"><path d="m17 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
);
const IconDollar: IconComponent = ({ size=16, stroke=1.5 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
);
const IconBrackets: IconComponent = ({size=16, stroke=1.5}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>
);
const IconWrench: IconComponent = ({size=16, stroke=1.5}) => (
  <svg xmlns="http://www.w3.org/2000/svg" stroke-width={stroke} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></svg>
);
const IconZap: IconComponent = ({size=16, stroke=1.5}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} width={size} height={size} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// Mapping capabilities to icons. Expand as needed.
const capabilityIconMap: Record<string, IconComponent> = {
  "reasoning": IconThinking,
  "vision": IconEye,
  "safety-modes": IconShield,
  "citations": IconFileText,
  "tool-use": IconCode,
  "structured-outputs": IconBrackets,
};

type CardProps = {
  title: string;
  icon?: IconComponent;
  children: React.ReactNode;
};

const Card = ({ title, icon: Icon, children }: CardProps) => (
  <div className="p-5 border rounded-2xl shadow-md fern-card">
    <div className="flex items-center space-x-2 mb-5">
      {Icon && <Icon className="text-gray-700" size={22} stroke={1} />}
      <div className="text-lg font-semibold">{title}</div>
    </div>
    {children}
  </div>
);

type TagProps = {
  icon?: React.ComponentType<{ className?: string }>;
  label: React.ReactNode;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

const Tag = ({ icon: Icon, label, disabled, className, ...rest }: TagProps) => (
  <span
    className={`inline-flex items-center gap-2 px-3 py-1 bg-(color:--grayscale-a3) rounded-full text-sm font-medium ${disabled ? 'opacity-50 text-gray-400' : ''}} ${className ?? ''}`}
    {...rest}
  >
    {Icon ? <Icon className="w-4 h-4 text-gray-600" /> : null}
    {label}
  </span>
);

type TagListProps = {className?: string, items: { id: string, label: string, disabled?: boolean }[] };

const TagList = ({ items, className }: TagListProps) => (
  <div className={`flex flex-wrap gap-2 ${className ?? ''}`}>
    {items.map((item, idx) => {
      const Icon = capabilityIconMap[item.id]
      return <Tag key={idx} icon={Icon} label={item.label} disabled={item.disabled} />;
    })}
  </div>
);

type Model = {
  name: string;
  id: string;
  description: string;
  longDescription?: string;
  capabilities: string[];
  pricing: { input: number; output: number };
  specs: { contextWindow: number; maxOutputTokens: number; knowledgeCutoff: string };
  endpoints: string[];
};

const getCapabilities = (enabledCapabilities: string[]) => {
  let capabilities = [
    {id: "reasoning", label: "Reasoning", disabled: !enabledCapabilities.includes("reasoning")},
    {id: "vision", label: "Vision", disabled: !enabledCapabilities.includes("vision")},
    {id: "safety-modes", label: "Safety Modes", disabled: !enabledCapabilities.includes("safety-modes")},
    {id: "citations", label: "Citations", disabled: !enabledCapabilities.includes("citations")},
    {id: "tool-use", label: "Tool Use", disabled: !enabledCapabilities.includes("tool-use")},
    {id: "structured-outputs", label: "Structured Outputs", disabled: !enabledCapabilities.includes("structured-outputs")},
  ]
  // update order such that disabled capabilites are at the bottom
  capabilities.sort((a, b) => Number(a.disabled) - Number(b.disabled));
  return capabilities;
}

const getEndpoints = (enabledEndpoints: string[]) => {
  let endpoints = [
    {id: "chat-v2", label: "Chat V2", disabled: !enabledEndpoints.includes("chat-v2")},
    {id: "chat-v1", label: "Chat V1", disabled: !enabledEndpoints.includes("chat-v1")},
    {id: "chat-completions", label: "Chat Completions", disabled: !enabledEndpoints.includes("chat-completions")},
  ]
  // update order such that disabled endpoints are at the bottom
  endpoints.sort((a, b) => Number(a.disabled) - Number(b.disabled));
  return endpoints;
}

export const ModelShowcase = ({ model }: { model: Model }) => (
  <div className="max-w-5xl mx-auto space-y-6 font-sans">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Capabilities */}
      <Card title="Capabilities" icon={IconSparkles}>
        <TagList items={getCapabilities(model.capabilities)} />
      </Card>

      {/* Pricing (compact card) */}
      <Card title="Pricing" icon={IconDollar}>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Input</p>
            <p className="text-lg font-semibold">${model.pricing.input}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Output</p>
            <p className="text-lg font-semibold">${model.pricing.output}</p>
          </div>
        </div>
      </Card>

      {/* Specs */}
      <Card title="Specifications" icon={IconWrench}>
        <ul className="space-y-2 text-sm">
          <div><strong>Context Window:</strong> {model.specs.contextWindow.toLocaleString()} tokens</div>
          <div><strong>Max Output Tokens:</strong> {model.specs.maxOutputTokens.toLocaleString()}</div>
          <div><strong>Knowledge Cutoff:</strong> {model.specs.knowledgeCutoff}</div>
        </ul>
      </Card>

      {/* Endpoints */}
      <Card title="API Endpoints" icon={IconZap}>
        <p className='text-sm mb-3'>
          <strong>Model ID</strong>
          <div className="text-sm text-gray-500 ml-3">{model.id}</div>
        </p>
        <div className="flex flex-wrap gap-2">
          {getEndpoints(model.endpoints).map((ep, i) => (
            <Tag key={i} label={ep.label} disabled={ep.disabled} />
          ))}
        </div>
      </Card>
    </div>
    <div className="flex justify-end mt-6">
      <a
        href="/playground"
        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-150"
        style={{ borderRadius: '999px' }}
      >
        Try in Playground
      </a>
    </div>
  </div>
);
