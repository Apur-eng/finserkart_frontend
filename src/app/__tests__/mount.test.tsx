// @vitest-environment jsdom
import { describe, it } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

describe('App client mounting test', () => {
  it('mounts App into DOM without throwing client errors', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    window.history.pushState({}, '', '/about');

    await act(async () => {
      createRoot(root).render(<App />);
    });

    console.log('Mounted successfully, root innerHTML length:', root.innerHTML.length);
  });
});
