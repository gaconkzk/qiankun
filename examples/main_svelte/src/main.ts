import 'zone.js';
import './app.css';
import Dzota from './Dzota.svelte';

// hack process
if (!window.process) {
  (window as any).process = {};
}

const ap = () => {
  try {
    const app = new Dzota({
      target: document.getElementById('app'),
    });
  } catch (err) {
    console.error(err);
  }
};

export default ap();
