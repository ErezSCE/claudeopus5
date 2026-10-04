/**
 * Ambient typing for JSON imports used by build-configuration specs
 * (ngsw-config.json / angular.json). JSON is bundled natively by the Karma builder.
 */
declare module '*.json' {
  const value: unknown;
  export default value;
}
