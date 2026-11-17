import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import type PrototypeStateService from 'ember-hds-prototype/services/prototype-state';
import { defaultPersonaId } from 'ember-hds-prototype/data/prototype-personas';
import { defaultScenarioId } from 'ember-hds-prototype/data/prototype-scenarios';

export default class ApplicationController extends Controller {
  @service declare prototypeState: PrototypeStateService;

  queryParams = ['scenario', 'persona'];

  // Unknown ids in a shared URL fall back to the defaults.
  get scenario(): string {
    return this.prototypeState.selectedScenarioId;
  }

  set scenario(value: string) {
    this.prototypeState.selectScenario(
      this.prototypeState.isScenario(value) ? value : defaultScenarioId,
    );
  }

  get persona(): string {
    return this.prototypeState.selectedPersonaId;
  }

  set persona(value: string) {
    this.prototypeState.selectPersona(
      this.prototypeState.isPersona(value) ? value : defaultPersonaId,
    );
  }

  @action
  selectScenario(id: string): void {
    this.scenario = id;
  }

  @action
  selectPersona(id: string): void {
    this.persona = id;
  }
}
