import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

export function MarketCarousel({markets}) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2 // optional, default to 1.
        },
    }
    return (
        <Carousel responsive={responsive} containerClass='market-snapshot-cards'>
            {markets?.map((market) => (
                <div className="market-snapshot">
                    <div>{market.ticker}</div>
                    <div>{market.price.toFixed(2)}</div>
                    <div style={{"display": "flex", "gap": "5px"}} className={market.past_day_return > 0 ? "win" : "lose"}>{market.past_day_return > 0 ? <FaCaretUp /> : <FaCaretDown />}{Math.abs(market.past_day_return * 100).toFixed(2)}%</div>
                </div>
            ))}
        </Carousel>
      )
}
