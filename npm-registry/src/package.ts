import { RequestHandler } from 'express';
import got from 'got';
import { Dependency, NPMPackage } from './types';

const NodeCache = require('node-cache');
const myCache = new NodeCache();

const getDependencies = async function (name: string, version: string) {
  const cacheKey = name + '@' + version;
  const cacheValue = myCache.get(cacheKey);
  if (cacheValue !== undefined) {
    return cacheValue;
  }

  // Base dependencies object
  let dependenciesObject: Dependency = {
    name,
    version,
  };

  // Get dependencies from NPM
  const npmPackage: NPMPackage = await got(
    `https://registry.npmjs.org/${name}`
  ).json();
  const dependencies = npmPackage.versions[version].dependencies;

  // Check if package has dependencies
  if (dependencies) {
    dependenciesObject.dependencies = [];

    for (const [dependencyName, dependencyVersion] of Object.entries(
      dependencies
    )) {
      const cleanValue = dependencyVersion.replace('^', '');

      const subDependencies = await getDependencies(dependencyName, cleanValue);
      if (subDependencies) {
        dependenciesObject.dependencies.push(subDependencies);
      }
    }
  }

  myCache.set(name + '@' + version, dependenciesObject, 10000);

  return dependenciesObject;
};

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
export const getPackage: RequestHandler = async function (req, res, next) {
  const { name, version } = req.params;

  try {
    const dependenciesTree = await getDependencies(name, version);

    return res.status(200).json(dependenciesTree);
  } catch (error) {
    return next(error);
  }
};

/**
 * Shows a tree of the dependencies as HTML.
 */
export const getPackageTree: RequestHandler = async function (req, res, next) {
  const { name, version } = req.params;
  const host = req.get('host');

  try {
    const packageTree = await got(
      `http://${host}/package/${name}/${version}`
    ).json();

    const treeify = require('treeify');
    const tree = treeify.asTree(packageTree, true);

    res.render('pages/tree', { tree: tree });
  } catch (error) {
    return res.sendStatus(404);
  }
};
