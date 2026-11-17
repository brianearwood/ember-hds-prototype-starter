import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {
  defaultPersonaId,
  prototypePersonas,
  type PrototypeCapability,
  type PrototypePersona,
} from 'ember-hds-prototype/data/prototype-personas';
import {
  defaultScenarioId,
  prototypeScenarios,
  type PrototypeScenario,
} from 'ember-hds-prototype/data/prototype-scenarios';

/**
 * Shared prototype state. The application controller keeps the selected
 * scenario and persona in sync with the `scenario` and `persona` query params,
 * so every state can be shared with a link.
 */
export default class PrototypeStateService extends Service {
  readonly scenarios = prototypeScenarios;
  readonly personas = prototypePersonas;

  @tracked selectedScenarioId = defaultScenarioId;
  @tracked selectedPersonaId = defaultPersonaId;

  get selectedScenario(): PrototypeScenario {
    return findById(this.scenarios, this.selectedScenarioId);
  }

  get selectedPersona(): PrototypePersona {
    return findById(this.personas, this.selectedPersonaId);
  }

  isScenario(id: string): boolean {
    return this.scenarios.some((scenario) => scenario.id === id);
  }

  isPersona(id: string): boolean {
    return this.personas.some((persona) => persona.id === id);
  }

  /**
   * Selects a scenario. Reset any scenario-specific mutable state here so each
   * scenario starts from its fixtures.
   */
  selectScenario(id: string): void {
    this.selectedScenarioId = findById(this.scenarios, id).id;
  }

  selectPersona(id: string): void {
    this.selectedPersonaId = findById(this.personas, id).id;
  }

  can = (capability: PrototypeCapability): boolean =>
    this.selectedPersona.capabilities.includes(capability);
}

function findById<T extends { id: string }>(
  items: readonly T[],
  id: string,
): T {
  const item = items.find((candidate) => candidate.id === id);

  if (!item) {
    throw new Error(`Unknown prototype fixture id "${id}"`);
  }

  return item;
}
