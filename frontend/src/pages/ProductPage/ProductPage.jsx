import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navigation from '../../components/Navigation';
import axiosInstance from '../../api/axiosInstance';
import ProductDetail from '../../components/ProductDetail';

const ProductPage = () => {
  const params = useParams();

  const [productData, setProductData] = useState(undefined);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/product?productId=${params.id}`
        );

        setProductData(data);
      } catch (error) {
        if (error?.response?.status === 404) {
          return console.warn(
            'Something went wrong, please do not modify the URL in your browser. If you are sure that you did not modify the URL, Please conatct the shop!'
          );
        }

        return console.warn(
          `There's error happening, please try refreshing the page.`
        );
      }
    };

    getProduct();
  }, [params.id]);

  return (
    <>
      <Navigation />
      <ProductDetail {...productData} />
    </>
  );
};

export default ProductPage;
