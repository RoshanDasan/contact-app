import axios from "axios";

export const WorldData = async () => {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const contryData = async () => {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const GraphData = async () => {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
