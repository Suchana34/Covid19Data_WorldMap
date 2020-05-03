import React from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Map from 'components/Map';


const LOCATION = {
  lat: 38.9072,
  lng: -77.0369
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;


const IndexPage = () => {


  async function mapEffect({ leafletElement: map} = {}) {
    //This function is used to run code that fires when the map renders.
    //but here lets make our request to the api endpoint
    let res; //for storing our response

    try{
      res = await axios.get('https://corona.lmao.ninja/v2/countries'); //make a get request with help of axios
    }catch(err){
      console.log(`Failed to request, Try again:${err.message}`, err);
      return;
    }
    //destructure data from the response and set the default value to an empty array, as that will be the type of data we need
    const { data = []} = res;
    

    const isdata = Array.isArray(data) && data.length>0;

    if(!isdata)
      return;
    
    else{
      const geoJson = {
        type: 'FeatureCollection',
        features: data.map((country={})=>{
          const {countryProps = {}} = country
          const {lat, long:lng} = countryProps
          return{
            type: 'Feature',
            properties: {
              ...country,
            },
            geometry:{
              type: 'point',
              coordinates: [lng, lat]
            }
          }
        })
      }
    }
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}/>

      <Container type="content" className="text-center home-start">
        <h2>Still Getting Started?</h2>
        <p>Run the following in your terminal!</p>
        <pre>
          <code>gatsby new [directory] https://github.com/colbyfayock/gatsby-starter-leaflet</code>
        </pre>
        <p className="note">Note: Gatsby CLI required globally for the above command</p>
      </Container>
    </Layout>
  );
};

export default IndexPage;
