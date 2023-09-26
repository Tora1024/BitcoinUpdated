import { useContext, useEffect, useState } from 'preact/hooks';
import { PriceContext } from '../../context/PriceContext';

function PriceDisplay() {
  const priceContext = useContext(PriceContext);
  const [loading, setLoading] = useState(true);
  const [previousPrice, setPreviousPrice] = useState<string | null>(null);
  const [priceColor, setPriceColor] = useState<string>('');
  const [priceArrow, setPriceArrow] = useState<string>('');

  useEffect(() => {
    const fetchPriceInterval = setInterval(() => {
      priceContext?.updateBitcoinPrice?.();
    }, 30000);

    return () => {
      clearInterval(fetchPriceInterval);
    };
  }, [priceContext]);

  useEffect(() => {
    setLoading(false);

    if ((!!priceContext?.bitcoinPrice && previousPrice === null) || (!!priceContext?.bitcoinPrice && priceContext?.bitcoinPrice !== previousPrice)) {
      setPreviousPrice(priceContext.bitcoinPrice);
      const priceColor = getPriceColor();
      const priceArrow = getPriceArrow();

      setPriceColor(priceColor);
      setPriceArrow(priceArrow);
    }
  }, [priceContext?.bitcoinPrice]);

  const getPriceColor = () => {
    if (previousPrice === null) {
      return '';
    }

    const currentPrice = priceContext?.bitcoinPrice || 'N/A';

    if (currentPrice && previousPrice) {
      if (currentPrice > previousPrice) {
        return 'text-green-500'; // Price went up
      } else if (currentPrice < previousPrice) {
        return 'text-red-500'; // Price went down
      }
    }

    return ''; // Default color
  };

  const getPriceArrow = () => {
    const currentPrice = priceContext?.bitcoinPrice || 'N/A';
    if (currentPrice === 'N/A') {
      return '';
    }
    return getPriceColor() === 'text-green-500' ? '↑' : '↓';
  };

  return (
    <div className="text-center mt-16">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p className={`text-4xl font-bold ${priceColor}`}>
            ${priceContext?.bitcoinPrice || 'N/A'}
            <span className={`ml-2 ${priceColor}`}>{priceArrow}</span>
          </p>
          {<span className="text-sm text-gray-500">Updating every 30 seconds...</span>}
        </div>
      )}
    </div>
  );
}

export default PriceDisplay;
