//import Link from 'next/link'
import Categories from '../components/Categories/CategoriesContainer'
import fetch from "isomorphic-unfetch";




const Index = ({ categories = [] }) => {
  return <Categories categories={categories} />;
};

Index.getInitialProps = async function() {
  const res = await fetch("http://localhost:3000/api/categories");
  const categories = await res.json();

  return {
    categories
  };

};

export default Index
