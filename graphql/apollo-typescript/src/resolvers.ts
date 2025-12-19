export default {
  Query: {
    nearbyAtms: async (_source, { latitude, longitude }, { dataSources }) => {
      return dataSources.googlePlaceAPI.getAllNearbyAtms(latitude, longitude);
    },
    nearbyServices: async (_source, { latitude, longitude }, { dataSources }) => {
      return dataSources.googlePlaceAPI.getAllNearbyServices(latitude, longitude);
    },
    singlePlace: async (_source, { placeId }, { dataSources }) => {
      return dataSources.googlePlaceAPI.getPlace(placeId);
    },
  },
};