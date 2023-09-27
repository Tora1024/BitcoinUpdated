import { Router, Route } from 'preact-router';
import { PriceProvider } from '../context/PriceContext';
import Header from './Header/Index';
import Footer from './Footer/Index';
import PriceDisplay from './PriceDisplay/Index';
import AboutUs from './AboutUs/Index';
import './app.css';

export function App() {
  return (
    <PriceProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow">
          <Router>
            <Route path="/" component={PriceDisplay} />
            <Route path="/about" component={AboutUs} />
          </Router>
        </main>

        <Footer />
      </div>
    </PriceProvider>
  );
}

export default App;

{
  /* <main className="flex-grow">
          <PriceDisplay />
        </main> */
}
