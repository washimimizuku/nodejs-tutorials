query {
  nearbyAtms(latitude:46.5124197, longitude:6.6329685) {
    name,
    place_id
  }
}

query {
  nearbyServices(latitude:46.5124197, longitude:6.6329685) {
    name,
    place_id
  }
}

query {
  singlePlace(placeId:"ChIJ1WQzUTIujEcRMcfhhDiuiao") {
    name,
    place_id
  }
}