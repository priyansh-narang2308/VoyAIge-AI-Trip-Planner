import './App.css';
import Hero from './components/landing/hero';
import { ThemeProvider } from './components/theme-provider';

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dar" storageKey="vite-ui-theme">
        <Hero />
      </ThemeProvider>
    </>
  );
}

export default App;
