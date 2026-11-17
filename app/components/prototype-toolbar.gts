import Component from '@glimmer/component';
import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import {
  HdsDropdown,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import type { PrototypePersona } from 'ember-hds-prototype/data/prototype-personas';
import type { PrototypeScenario } from 'ember-hds-prototype/data/prototype-scenarios';

interface PrototypeToolbarSignature {
  Args: {
    scenarios: readonly PrototypeScenario[];
    personas: readonly PrototypePersona[];
    selectedScenario: PrototypeScenario;
    selectedPersona: PrototypePersona;
    onSelectScenario: (id: string) => void;
    onSelectPersona: (id: string) => void;
  };
  Element: HTMLElement;
}

const eq = (a: unknown, b: unknown): boolean => a === b;

export default class PrototypeToolbar extends Component<PrototypeToolbarSignature> {
  select = (onSelect: (id: string) => void, id: string, close: () => void) => {
    onSelect(id);
    close();
  };

  <template>
    <section
      class="prototype-toolbar"
      aria-label="Prototype controls"
      ...attributes
    >
      <div class="prototype-toolbar-context">
        <HdsIcon @name="beaker" @size="16" />
        <strong>Prototype</strong>
      </div>

      <div class="prototype-toolbar-controls">
        <HdsDropdown
          @listPosition="bottom-right"
          @width="320px"
          @enableCollisionDetection={{true}}
          as |D|
        >
          <D.ToggleButton
            @text={{@selectedScenario.name}}
            @color="secondary"
            aria-label={{concat "Scenario: " @selectedScenario.name}}
            data-test-scenario-toggle
          />
          {{#each @scenarios as |scenario|}}
            <D.Checkmark
              @selected={{eq scenario.id @selectedScenario.id}}
              {{on
                "click"
                (fn this.select @onSelectScenario scenario.id D.close)
              }}
              data-test-scenario-option={{scenario.id}}
            >
              {{scenario.name}}
            </D.Checkmark>
          {{/each}}
        </HdsDropdown>

        <HdsDropdown
          @listPosition="bottom-right"
          @width="280px"
          @enableCollisionDetection={{true}}
          as |D|
        >
          <D.ToggleButton
            @text={{@selectedPersona.name}}
            @badge={{@selectedPersona.permission}}
            @color="secondary"
            aria-label={{concat
              "Persona: "
              @selectedPersona.name
              ", "
              @selectedPersona.permissionLabel
            }}
            data-test-persona-toggle
          />
          {{#each @personas as |persona|}}
            <D.Checkmark
              @selected={{eq persona.id @selectedPersona.id}}
              {{on
                "click"
                (fn this.select @onSelectPersona persona.id D.close)
              }}
              data-test-persona-option={{persona.id}}
            >
              {{persona.name}}
              <span
                class="prototype-menu-secondary"
                aria-hidden="true"
              >{{persona.permission}}</span>
              <span class="sr-only">{{persona.permissionLabel}}</span>
            </D.Checkmark>
          {{/each}}
        </HdsDropdown>
      </div>
    </section>
  </template>
}
