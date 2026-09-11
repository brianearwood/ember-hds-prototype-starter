export interface PrototypeScenario {
  id: string;
  name: string;
  description: string;
  status: 'success' | 'neutral';
  statusText: string;
}

export const prototypeScenarios: PrototypeScenario[] = [
  {
    id: 'baseline',
    name: 'Baseline',
    description: 'The default state for the prototype.',
    status: 'success',
    statusText: 'Ready',
  },
  {
    id: 'edge-case',
    name: 'Edge case',
    description: 'A fixture for testing an alternate product state.',
    status: 'neutral',
    statusText: 'Draft',
  },
];
