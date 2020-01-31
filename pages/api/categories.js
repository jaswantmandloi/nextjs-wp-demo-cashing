import fetch from "isomorphic-unfetch";

export default async (req, res) => {

  const apiResponse = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await apiResponse.json();

  res.status(200).json(data);

};
