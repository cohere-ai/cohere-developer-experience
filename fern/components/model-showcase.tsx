import React from 'react';

type IconComponent = React.ComponentType<{ className?: string, size?: number, stroke?: number, disabled?: boolean }>;

const getSvg = ({size=16, stroke=1.5, disabled, children}: {size?: number, stroke?: number, disabled?: boolean, children: React.ReactNode}) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} width={size} height={size} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {disabled && <path d="M2 2 22 22"/>}
      {children}
    </svg>
  )
}

const IconEye: IconComponent = (props) => {
  const children = <><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>
  return getSvg({...props, children})
}
const IconStar: IconComponent = (props) => {
  const children = <><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></>
  return getSvg({...props, children})
}
const IconShield: IconComponent = (props) => {
  const children = <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></>
  return getSvg({...props, children})
}
const IconFileText: IconComponent = (props) => {
  const children = <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></>
  return getSvg({...props, children})
}
const IconThinking: IconComponent = (props) => {
  const children = <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>
  return getSvg({...props, children})
}
const IconCode: IconComponent = (props) => {
  const children = <><path d="m17 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></>
  return getSvg({...props, children})
}
const IconCoins: IconComponent = (props) => {
  const children = <><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></>
  return getSvg({...props, children})
}
const IconBrackets: IconComponent = (props) => {
  const children = <><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></>
  return getSvg({...props, children})
}
const IconWrench: IconComponent = (props) => {
  const children = <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></>
  return getSvg({...props, children})
}
const IconZap: IconComponent = (props) => {
  const children = <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>
  return getSvg({...props, children})
}
const IconLanguages: IconComponent = (props) => {
  const children = <><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></>
  return getSvg({...props, children})
}

// Mapping capabilities to icons. Expand as needed.
const capabilityIconMap: Record<string, IconComponent> = {
  "reasoning": IconThinking,
  "multilingual": IconLanguages,
  "image-inputs": IconEye,
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
  icon?: React.ComponentType<{ className?: string, disabled?: boolean }>;
  label: React.ReactNode;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

const Tag = ({ icon: Icon, label, disabled, className, ...rest }: TagProps) => (
  <span
    className={`inline-flex items-center gap-2 px-3 py-1 bg-(color:--grayscale-a3) rounded-full text-sm font-medium ${disabled ? 'opacity-50 text-gray-400' : ''}} ${className ?? ''}`}
    {...rest}
  >
    {Icon ? <Icon className="w-4 h-4 text-gray-600" disabled={disabled} /> : null}
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
  specs: { contextWindow: number; maxOutputTokens: number; knowledgeCutoff: string, customSpecs: { name: string; value: string }[] };
  endpoints: string[];
};

const getCapabilities = (enabledCapabilities: string[]) => {
  let capabilities = [
    {id: "reasoning", label: "Reasoning", disabled: !enabledCapabilities.includes("reasoning")},
    {id: "multilingual", label: "Multilingual", disabled: !enabledCapabilities.includes("multilingual")},
    {id: "image-inputs", label: "Image Inputs", disabled: !enabledCapabilities.includes("image-inputs")},
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
      <Card title="Capabilities" icon={IconStar}>
        <TagList items={getCapabilities(model.capabilities)} />
      </Card>

      {/* Pricing */}
      <Card title="Pricing" icon={IconCoins}>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-500">Input</div>
            <p className="text-lg font-medium">${model.pricing.input} / 1M tokens</p>
          </div>
          <div>
            <div className="text-sm text-gray-500">Output</div>
            <p className="text-lg font-medium">${model.pricing.output} / 1M tokens</p>
          </div>
        </div>
      </Card>

      {/* Specs */}
      <Card title="Specifications" icon={IconWrench}>
        <ul className="space-y-2 text-sm">
          <div><strong>Context Window:</strong> {model.specs.contextWindow} tokens</div>
          <div><strong>Max Output Tokens:</strong> {model.specs.maxOutputTokens} tokens</div>
          <div><strong>Knowledge Cutoff:</strong> {model.specs.knowledgeCutoff}</div>
          {model.specs.customSpecs?.map((spec, i) => (
            <div key={i}><strong>{spec.name}:</strong> {spec.value}</div>
          ))}
        </ul>
      </Card>

      {/* Endpoints */}
      <Card title="API Endpoints" icon={IconZap}>
        <p className='text-sm mb-3'>
          <strong>Model ID</strong>
          <div className="text-sm text-gray-500">{model.id}</div>
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
        href={"https://dashboard.cohere.com/playground?model=" + model.id}
        className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-full shadow transition-all duration-200 no-underline"
        style={{
          borderRadius: '999px',
          backgroundColor: '#2563eb',
          textDecoration: 'none',
        }}
      >
        <span className="relative z-10">Try in Playground</span>
      </a>
    </div>
  </div>
);
