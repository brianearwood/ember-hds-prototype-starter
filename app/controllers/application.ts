import Controller from '@ember/controller';
import { prototypeScenarios } from 'ember-hds-prototype/data/prototype-scenarios';

export default class ApplicationController extends Controller {
  prototypeScenarios = prototypeScenarios;
}
