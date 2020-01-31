import fetch from "isomorphic-unfetch";

export default async (req, res) => {

  const apiResponse = await fetch(
    "https://www.w3schools.in/wp-json/wp/v2/categories?per_page=100"
  );
  const data = await apiResponse.json();

  res.status(200).json(data);

};
