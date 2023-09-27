import { useContext, useEffect, useState } from 'preact/hooks';
import { PriceContext } from '../../context/PriceContext';

function PriceDisplay() {
  const priceContext = useContext(PriceContext);
  const [loading, setLoading] = useState(true);
  const [previousPrice, setPreviousPrice] = useState<string | null>(null);
  const [priceColor, setPriceColor] = useState<string>('');
  const [priceArrow, setPriceArrow] = useState<string>('');
  const [updating, setUpdating] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const fetchPriceAndUpdate = () => {
      priceContext?.updateBitcoinPrice?.();
      setUpdating(false);
      setCountdown(30);
    };

    // Initially fetch and start the countdown
    fetchPriceAndUpdate();

    // Fetch and start the countdown every 30 seconds
    const fetchInterval = setInterval(fetchPriceAndUpdate, 30000);

    return () => {
      clearInterval(fetchInterval);
      setUpdating(true);
    };
  }, [priceContext]);

  useEffect(() => {
    // Start countdown timer
    const countdownTimer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    // Reset countdown when updating
    if (updating) {
      setCountdown(30);
    }

    // Clear the timer when the component unmounts
    return () => clearInterval(countdownTimer);
  }, [countdown, updating]);

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

    return ''; // Starts with no color for the first 30 seconds
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
          {!updating && <span className="text-sm text-gray-500">{countdown > 0 ? `Updating in ${countdown} seconds...` : 'Updating now...'}</span>}
          {/* {<span className="text-sm text-gray-500">Updating every 30 seconds...</span>} */}
        </div>
      )}
    </div>
  );
}

export default PriceDisplay;
