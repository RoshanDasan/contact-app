import axios from "axios";
import { useQuery } from 'react-query';

export const useWorldData = () => {
  return useQuery('worldData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    return response.data;
  });
};

export const useCountryData = () => {
  return useQuery('countryData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    console.log(response.data);
    
    return response.data;
  });
};

export const useGraphData = () => {
  return useQuery('graphData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    console.log(response.data);
    
    return response.data;
  });
};
