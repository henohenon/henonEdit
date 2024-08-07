import { createSignal } from 'solid-js';

import ButtonComponent from './components/ButtonComponent';
import CountDisplay from './components/CountDisplay';

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <ButtonComponent setCount={setCount} />

      </div>
      <div>
        <CountDisplay count={count} />
      </div>
  </div>
  );
}

export default App;
