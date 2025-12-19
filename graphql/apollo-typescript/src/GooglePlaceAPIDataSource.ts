import { RESTDataSource } from 'apollo-datasource-rest';

export class GooglePlaceAPIDataSource extends RESTDataSource {
  googleApiKey: string;
  baseURL: string;
  constructor() {
    super();
    this.baseURL = 'https://maps.googleapis.com/maps/api/place/';
    this.googleApiKey = process.env.GOOGLE_API_KEY;
  }

  async getAllNearbyAtms(latitude: number, longitude: number) {
    const data = await this.get(`/nearbysearch/json?key=${this.googleApiKey}&location=${latitude},${longitude}&radius=1000&type=atm`);
    return data.results;
  }

  async getAllNearbyServices(latitude: number, longitude: number) {
    const data = await this.get(`/nearbysearch/json?key=${this.googleApiKey}&location=${latitude},${longitude}&radius=1000&type=atm`);
    return data.results;
  }

  async getPlace(placeId: string) {
    const data = await this.get(`/details/json?key=${this.googleApiKey}&place_id=${placeId}`);
    return data.result;
  }
};