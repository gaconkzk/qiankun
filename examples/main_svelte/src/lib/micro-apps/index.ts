import {
  addGlobalUncaughtErrorHandler,
  initGlobalState,
  registerMicroApps,
  removeGlobalUncaughtErrorHandler,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
} from '../../../../../es';

const onUncatchedErrorHandler = (e: any, loader?: (l: boolean) => void) => {
  const appName = e?.error?.appOrParcelName || 'unknown';
  console.error('Sub application exception. Name: ', appName, e?.error);
  if (e?.error) {
    delete e.error;
  }
  if (loader) {
    loader(false);
  }
  e.preventDefault();
};

export const initialize_microapps = (loader) => {
  addGlobalUncaughtErrorHandler((e) => onUncatchedErrorHandler(e, loader));

  window.addEventListener('error', onUncatchedErrorHandler);

  // TODO global state will be removed in 3.0 - check after migrate to 3.0
  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun',
  });

  onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

  setGlobalState({
    ignore: 'master',
    user: {
      name: 'master',
    },
  });

  registerMicroApps(
    [
      {
        name: 'react16',
        entry: '//localhost:7100',
        container: '#subapp-viewport',
        loader,
        activeRule: '/react16',
      },
      {
        name: 'react15',
        entry: '//localhost:7102',
        container: '#subapp-viewport',
        loader,
        activeRule: '/react15',
      },
      {
        name: 'vue',
        entry: '//localhost:7101',
        container: '#subapp-viewport',
        loader,
        activeRule: '/vue',
      },
      {
        name: 'angular9',
        entry: '//localhost:7103',
        container: '#subapp-viewport',
        loader,
        activeRule: '/angular9',
      },
      {
        name: 'purehtml',
        entry: '//localhost:7104',
        container: '#subapp-viewport',
        loader,
        activeRule: '/purehtml',
      },
      {
        name: 'vue3',
        entry: '//localhost:7105',
        container: '#subapp-viewport',
        loader,
        activeRule: '/vue3',
      },
    ],
    {
      beforeLoad: [
        async (app) => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
      ],
      beforeMount: [
        async (app) => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
      ],
      afterUnmount: [
        async (app) => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
      ],
    },
    {
      poweredBy: '__POWERED_BY_THE_FLIES__',
    },
  );

  setDefaultMountApp('/react16');

  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });

  start({
    prefetch: false,
    sandbox: {
      // experimentalStyleIsolation: true,
    },
  });
};

export const uninitialize_microapps = () => {
  removeGlobalUncaughtErrorHandler(onUncatchedErrorHandler);
  window.removeEventListener('error', onUncatchedErrorHandler);
};
