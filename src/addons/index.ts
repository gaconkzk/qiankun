/**
 * @author Kuitos
 * @since 2020-03-02
 */

import { concat, mergeWith } from 'lodash';
import type { EnvironmentOptions, FrameworkLifeCycles, ObjectType } from '../interfaces';
import getEngineFlagAddon from './engineFlag';
import getRuntimePublicPathAddOn from './runtimePublicPath';

export default function getAddOns<T extends ObjectType>(
  global: Window,
  publicPath: string,
  options?: EnvironmentOptions,
): FrameworkLifeCycles<T> {
  return mergeWith(
    {},
    getEngineFlagAddon(global, options),
    getRuntimePublicPathAddOn(global, publicPath, options),
    (v1, v2) => concat(v1 ?? [], v2 ?? []),
  );
}
