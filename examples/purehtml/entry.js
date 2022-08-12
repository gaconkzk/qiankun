const render = async () => {
  document.getElementById('purehtml-container').innerHTML = 'Hello, render with native dom api!';
};

((global) => {
  global['purehtml'] = {
    bootstrap: async () => {
      console.log('purehtml bootstrap');
    },
    mount: async () => {
      console.log('purehtml mount');
      render();
    },
    unmount: async () => {
      console.log('purehtml unmount');
    },
  };
})(window);
