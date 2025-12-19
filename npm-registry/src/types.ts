/**
 * The result of a package request against `https://registry.npmjs.org`. This is
 * a subset of the returned data, not a full representation, that contains
 * everything you will need to carry out the exercise.
 *
 * @example
 * {
 *   "name": "react",
 *   "description": "React is a JavaScript library for building user interfaces.",
 *   "dist-tags": {
 *     "latest": "16.13.0"
 *   },
 *   "versions": {
 *     "16.13.0": {
 *       "name": "react",
 *       "version": "16.13.0",
 *       "dependencies": {
 *         "loose-envify": "^1.1.0",
 *         "object-assign": "^4.1.1",
 *         "prop-types": "^15.6.2",
 *       }
 *     }
 *   }
 * }
 */
export interface NPMPackage {
  name: string;
  description: string;
  'dist-tags': {
    [tag: string]: string;
  };
  versions: {
    [version: string]: {
      name: string;
      version: string;
      dependencies?: {
        [packageName: string]: string;
      };
    };
  };
}

/**
 * The structure of a dependency, including sub-dependencies.
 *
 * @example
 * {
 *   "name": "react",
 *   "version": "16.13.0",
 *   "dependencies": [
 *     {
 *       "name": "loose-envify",
 *       "version": "1.1.0",
 *       "dependencies": [
 *         {
 *           "name": "js-tokens",
 *           "version": "1.0.1"
 *         }
 *       ]
 *     },
 *     {
 *       "name": "object-assign",
 *       "version": "4.1.1"
 *     },
 *     {
 *       "name": "prop-types",
 *       "version": "15.6.2",
 *       "dependencies": [
 *         {
 *           "name": "loose-envify",
 *           "version": "1.3.1",
 *           "dependencies": [
 *             {
 *               "name": "js-tokens",
 *               "version": "3.0.0"
 *             }
 *           ]
 *         },
 *         {
 *           "name": "object-assign",
 *           "version":"4.1.1"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export interface Dependency {
  name: string;
  version: string;
  dependencies?: Dependency[];
}
