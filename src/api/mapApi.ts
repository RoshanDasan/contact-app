import axios from "axios";
import { useQuery } from 'react-query';


// query data of world
export const useWorldData = () => {
  return useQuery('worldData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    return response.data;
  });
};

// query data by contries
export const useCountryData = () => {
  return useQuery('countryData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    console.log(response.data);
    
    return response.data;
  });
};

// query data counts of death cased and living cased
export const useGraphData = () => {
  return useQuery('graphData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    console.log(response.data);
    
    return response.data;
  });
};
