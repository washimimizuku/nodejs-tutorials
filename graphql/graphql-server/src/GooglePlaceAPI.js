const { RESTDataSource } = require('apollo-datasource-rest');

class GooglePlaceAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://maps.googleapis.com/maps/api/place/';
    this.googleApiKey = process.env.GOOGLE_API_KEY;
  }

  async getAllNearbyAtms(latitude, longitude) {
    const data = await this.get(`/nearbysearch/json?key=${this.googleApiKey}&location=${latitude},${longitude}&radius=1000&type=atm`);
    return data.results;
  }

  async getAllNearbyServices(latitude, longitude) {
    const data = await this.get(`/nearbysearch/json?key=${this.googleApiKey}&location=${latitude},${longitude}&radius=1000&type=atm`);
    return data.results;
  }

  async getPlace(placeId) {
    const data = await this.get(`/details/json?key=${this.googleApiKey}&place_id=${placeId}`);
    return data.result;
  }
};

module.exports = GooglePlaceAPI;