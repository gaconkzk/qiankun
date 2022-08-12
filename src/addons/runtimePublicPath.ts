/**
 * @author Kuitos
 * @since 2019-11-12
 */
import type { EnvironmentOptions, FrameworkLifeCycles } from '../interfaces';

const rawPublicPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;

export default function getAddOn(
  global: Window,
  publicPath = '/',
  options?: EnvironmentOptions,
): FrameworkLifeCycles<any> {
  let hasMountedOnce = false;

  const publicPathName = options?.publicPathName ?? '__INJECTED_PUBLIC_PATH_BY_QIANKUN__';

  return {
    async beforeLoad() {
      // eslint-disable-next-line no-param-reassign
      global[publicPathName] = publicPath;
    },

    async beforeMount() {
      if (hasMountedOnce) {
        // eslint-disable-next-line no-param-reassign
        global[publicPathName] = publicPath;
      }
    },

    async beforeUnmount() {
      if (rawPublicPath === undefined) {
        // eslint-disable-next-line no-param-reassign
        delete global[publicPathName];
      } else {
        // eslint-disable-next-line no-param-reassign
        global[publicPathName] = rawPublicPath;
      }

      hasMountedOnce = true;
    },
  };
}
