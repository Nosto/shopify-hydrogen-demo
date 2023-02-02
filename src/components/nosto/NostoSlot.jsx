import {NostoItem} from './NostoItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function NostoSlot({recommendation}) {
  let {title, result_id, products} = recommendation;

  let carouselSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {breakpoint: 1024, settings: {slidesToShow: 3}},
      {breakpoint: 768, settings: {slidesToShow: 2}},
    ],
  };

  return (
    <div className="nosto-container">
      <div className="nosto-title">{title}</div>
      <div className="nosto-carousel">
        <Slider {...carouselSettings}>
          {products.map((product) => (
            <NostoItem key={product.productId} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
