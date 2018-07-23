import floor from 'lodash/floor';

export default function(distanceMiles) {
  if (!distanceMiles) return null;
  if (distanceMiles >= 1) {
    let miles = floor(distanceMiles, 1);
    return `${miles} ${miles === 1 ? 'mile' : 'miles'}`;
  } else {
    return `${Math.floor(distanceMiles * 1760)} yards`;
  }
}
