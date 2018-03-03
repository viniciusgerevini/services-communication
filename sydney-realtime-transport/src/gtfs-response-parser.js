module.exports = function feedResponseParser(decodeGtfsMessage) {
  return function parseGtfsMessage(body) {
    const feed = decodeGtfsMessage(body);
    return {
      id: feed.id,
      type: 'bus',
      trip_id: feed.vehicle.trip.trip_id,
      route_id: feed.vehicle.trip.route_id,
      position: {
        latitude: feed.vehicle.position.latitude,
        longitude: feed.vehicle.position.longitude
      }
    };
  };
};

