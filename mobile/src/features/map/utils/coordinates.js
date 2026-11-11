export function getFeatureCoordinate(feature) {
  const position = feature?.geometry?.coordinates?.[0]?.[0]?.[0];

  if (
    !Array.isArray(position) ||
    typeof position[0] !== 'number' ||
    typeof position[1] !== 'number'
  ) {
    return null;
  }

  return {
    latitude: position[1],
    longitude: position[0],
  };
}
