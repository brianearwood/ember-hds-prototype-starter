/**
 * Prototype identity used for social previews and release channels.
 * Replace these values when you create a prototype from the starter.
 */
export default {
  name: 'HDS prototype',
  description: 'An interactive product prototype built with Ember and Helios.',

  /**
   * Each deployment is assigned one release channel. The first channel whose
   * `branches` include the deployed branch wins; otherwise `defaultChannel`
   * is used. Set PROTOTYPE_RELEASE_CHANNEL to override detection.
   */
  releaseChannels: {
    stable: {
      label: 'Stable',
      branches: ['main'],
      isProduction: true,
    },
    preview: {
      label: 'Preview',
      branches: [],
    },
  },
  defaultChannel: 'preview',
};
