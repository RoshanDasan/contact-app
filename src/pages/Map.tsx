import { useEffect, useState } from 'react';
import { useCountryData, useGraphData } from '../api/mapApi';
import { Legend, Tooltip } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Skeleton } from '@mui/material';

const PieGraph = () => {
  const [countries, setCountries] = useState([]);
  const [graphDatas, setGraphData] = useState([]);

  const { data: countryData, isLoading: isCountryDataLoading } = useCountryData(); // fetching data based on contries to create map
  const { data: graphData, isLoading: isGraphDataLoading } = useGraphData(); // fetching data counts for line graph

  // useEffect for insert fetched data to useState
  useEffect(() => {

    if (graphData) {

      const graph = transformData(graphData)

      setGraphData(graph);

    }
    if (countryData) {
      setCountries(countryData);

    }
  }, [isCountryDataLoading, isGraphDataLoading]);

  const transformData = (apiData: any) => {
    const transformedData: any = [];

    for (const date in apiData.cases) {

      transformedData.push({
        name: date,
        cases: apiData.cases[date],
        deaths: apiData.deaths[date],
        recovered: apiData.recovered[date],
      });
    }

    return transformedData;
  };

  const ZoomControl = () => {
    const map = useMap();

    const handleZoomIn = () => {
      map.zoomIn();
    };

    const handleZoomOut = () => {
      map.zoomOut();
    };

    const zoomControlStyle: any = {
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: 1000,
    };

    return (
      <div className="zoom-control" style={zoomControlStyle}>
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
      </div>
    );
  };


  return (
    <div style={{ display: 'flex' }}>
      {!isGraphDataLoading ? (

        // line graph chart
        <div style={{ flex: '1' }}>
          <LineChart width={500} height={400} data={graphDatas}>
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotoneX" dataKey="cases" stroke="#8884d8" activeDot={{ r: 10 }} />
            <Line type="monotoneX" dataKey="deaths" stroke="#82ca9d" activeDot={{ r: 10 }} />
            <Line type="monotoneX" dataKey="recovered" stroke="#ffc658" activeDot={{ r: 10 }} />
          </LineChart>
        </div>
      ) : (
        <Skeleton variant="rectangular" width={500} height={400} animation="wave" style={{ margin: '30px 30px 30px 30px' }} />

      )}

      {!isCountryDataLoading ? (
        // map chart
        <div style={{ flex: '1', margin: '20px', maxHeight: '400px', overflowY: 'scroll' }}> 
          <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {countries.map((country: any, index) => (
              <Marker
                key={index}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={
                  L.divIcon({
                    className: 'custom-icon',
                    html: `<div class="marker-icon">${country.cases}</div>`,
                  })
                }
              >
                <Popup>
                  <div className="popup-content">
                    <h2>{country.country}</h2>
                    <p>Cases: {country.cases}</p>
                    <p>Deaths: {country.deaths}</p>
                    <p>Recovered: {country.recovered}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            <ZoomControl />
          </MapContainer>
        </div>
      ) : (
        <Skeleton variant="rectangular" width={500} height={400} animation="wave" style={{ margin: '30px 30px 30px 30px' }} />

      )}

    </div>
  );
};

export default PieGraph;
