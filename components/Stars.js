import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const star = (
  <path d="M14.5 0.5L18.9084 9.43237L28.7658 10.8647L21.6329 17.8176L23.3168 27.6353L14.5 23L5.68322 27.6353L7.36708 17.8176L0.234152 10.8647L10.0916 9.43237L14.5 0.5Z" />
);

const customStyles = {
  itemShapes: star,
  activeFillColor: '#E59500',
  inactiveFillColor: 'rgba(229,149,0,0.40)',
  
};

export default function Stars({ rating }) {
  

  return (
    <>
      <Rating
        style={{ maxWidth: 200 }}
        value={rating}
        itemStyles={customStyles}
        spaceBetween="big"
        readOnly
      />
    </>
  )
}
