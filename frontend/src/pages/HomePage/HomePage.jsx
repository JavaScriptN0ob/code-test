import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axiosInstance from '../../api/axiosInstance';
import Navigation from '../../components/Navigation';
import ProductOutlook from '../../components/ProductOutlook';

const Container = styled.div`
  margin: 20px 80px;
`;

const Header = styled.h2`
  text-align: center;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const HomePage = () => {
  const [homepageData, setHomepageData] = useState(undefined);

  useEffect(() => {
    const getProductsData = async () => {
      const { data } = await axiosInstance.get('/products');

      setHomepageData(data);
    };

    getProductsData();
  }, []);

  return (
    <>
      <Navigation />
      <Container>
        <Header>Our top 5 rated products</Header>
        <div>
          <ProductsContainer>
            {!!homepageData &&
              homepageData.map((data) => (
                <ProductOutlook key={data.id} enableClick {...data} />
              ))}
          </ProductsContainer>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
