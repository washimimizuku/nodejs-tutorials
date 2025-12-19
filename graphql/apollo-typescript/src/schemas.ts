import { gql } from 'apollo-server';

export default gql`
  type PlaceList {
    html_attributions: [String]
    results: [Place]
    status: String
  }

  type Place {
    id: String
    name: String
    geometry: Geometry
    icon: String
    opening_hours: OpeningHours
    photos: [Photo]
    place_id: String
    plus_code: PlusCode
    rating: Float
    reference: String
    scope: String
    types: [String]
    user_ratings_total: Int
    vicinity: String
    address_components: [AddressComponents]
    adr_address: String
    formatted_address: String
    formatted_phone_number: String
    international_phone_number: String
    reviews: [Review]
    url: String
    utc_offset: Int
    website: String
  }

  type Geometry {
    location: Location
    viewport: Viewport
  }

  type Location {
    lat: Float
    lng: Float
  }

  type Viewport {
    northeast: Location
    southwest: Location
  }

  type OpeningHours {
    open_now: Boolean
    periods: [Period]
    weekday_text: [String]
  }

  type Photo {
    height: Int
    width: Int
    photo_reference: String
    html_attributions: [String]
  }

  type PlusCode {
    compound_code: String
    global_code: String
  }

  type Query {
    nearbyAtms(latitude: Float!, longitude: Float!): [Place]
    nearbyServices(latitude: Float!, longitude: Float!): [Place]
    singlePlace(placeId: String!): Place
  }

  type AddressComponents {
    long_name: String
    short_name: String
    types: [String]
  }

  type Period {
    close: PeriodRange
    open: PeriodRange
  }

  type PeriodRange {
    day: Int
    time: String
  }

  type Review {
    author_name: String
    author_url: String
    language: String
    profile_photo_url: String
    rating: Int
    relative_time_description: String
    text: String
    time: Int
  }
`;