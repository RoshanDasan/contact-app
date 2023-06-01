import { useEffect, useState } from 'react';
import { contryData, GraphData } from '../api/mapApi';
import { Legend, Tooltip } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Skeleton from '@mui/material/Skeleton';
import L from 'leaflet';

const PieGraph = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const fetchData = async () => {
 
    const contryDatas = await contryData();
    const graphDatas: any = await GraphData();
    setCountries(contryDatas);
    setGraphData(transformData(graphDatas)); // Transforming graph data before setting it
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div style={{display: 'flex'}}>
        <Skeleton variant="rectangular" width={500} height={400} animation="wave" style={{margin: '30px 30px 30px 30px'}}/>
        <Skeleton variant="rectangular" width={500} height={400} animation="wave" style={{margin: '30px 50px 50px 30px'}}/>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1'}}>
        <LineChart width={500} height={400} data={graphData}>
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
    </div>
  );
};

export default PieGraph;
