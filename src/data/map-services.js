
const accessToken = process.env.GATSBY_MAPBOX_KEY

export const mapServices = [
  {

    name: 'Mapbox',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    url : `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
  }
];
