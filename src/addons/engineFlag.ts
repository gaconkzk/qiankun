/**
 * @author Kuitos
 * @since 2020-05-15
 */

import type { FrameworkLifeCycles, EnvironmentOptions } from '../interfaces';

export default function getAddOn(global: Window, options?: EnvironmentOptions): FrameworkLifeCycles<any> {
  const poweredBy = options?.poweredBy ?? '__POWERED_BY_QIANKUN__';
  return {
    async beforeLoad() {
      // eslint-disable-next-line no-param-reassign
      global[poweredBy] = true;
    },

    async beforeMount() {
      // eslint-disable-next-line no-param-reassign
      global[poweredBy] = true;
    },

    async beforeUnmount() {
      // eslint-disable-next-line no-param-reassign
      delete global[poweredBy];
    },
  };
}
