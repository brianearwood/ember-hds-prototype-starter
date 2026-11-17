export type PrototypeCapability = 'edit' | 'manage-settings';

export interface PrototypePersona {
  id: string;
  name: string;
  permission: 'admin' | 'write' | 'read';
  permissionLabel: string;
  capabilities: readonly PrototypeCapability[];
}

export const defaultPersonaId = 'admin';

export const prototypePersonas: readonly PrototypePersona[] = [
  {
    id: 'admin',
    name: 'Avery Park',
    permission: 'admin',
    permissionLabel: 'Admin permission',
    capabilities: ['edit', 'manage-settings'],
  },
  {
    id: 'editor',
    name: 'Jordan Lee',
    permission: 'write',
    permissionLabel: 'Write permission',
    capabilities: ['edit'],
  },
  {
    id: 'viewer',
    name: 'Riley Kim',
    permission: 'read',
    permissionLabel: 'Read permission',
    capabilities: [],
  },
];
