import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

export function MoverCarousel({movers}) {
    const winners = movers.winners;
    const losers = movers.losers;
    const total = [...winners, ...losers];
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
    const navigate = useNavigate();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5,
            slidesToSlide: 2 // optional, default to 1.
        },
    }
    return (
        <Carousel responsive={responsive} containerClass='winner-carousel'>
            {total?.map((stock) => (
            <div key={stock.ticker} className="mover-card" onClick={() => navigate(`/stocks/${stock.ticker}`)}>
              <h3>{stock.name}</h3>
              <div className={stock.past_day_return > 0 ? "win" : "lose"}>
                <h2>{currencyFormat.format(stock.price)}</h2>
                <h4>{(stock.past_day_return * 100).toFixed(2)} %</h4>
              </div>
            </div>
          ))}
        </Carousel>
      )
}
