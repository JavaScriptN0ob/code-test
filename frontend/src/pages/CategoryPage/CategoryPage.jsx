import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Navigation from '../../components/Navigation';
import axiosInstance from '../../api/axiosInstance';
import ProductOutlook from '../../components/ProductOutlook';

const Container = styled.div`
  margin: 20px 80px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  width: 800px;
  justify-content: space-between;
  margin-left: 30px;
`;

const CategoryItem = styled.div`
  text-align: center;
  cursor: pointer;
  border: 2px solid gray;
  padding: 5px;
  width: 150px;
  font-weight: ${(props) => (props.isCurrentCategory ? 'bold' : 'normal')};
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const CategoryPage = () => {
  const [categories, setCategories] = useState(undefined);
  const [currentCategory, setCategory] = useState(undefined);
  const [categoryProducts, setCategoryProducts] = useState(undefined);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axiosInstance.get('products/categories');

      setCategories(data);
    };

    getCategories();
  }, []);

  const getCategoryProducts = useCallback((category) => {
    const getProducts = async () => {
      const { data } = await axiosInstance.get(
        `/products/category/${category}`
      );

      setCategoryProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    !!categories && setCategory(categories[0]);
    !!categories && getCategoryProducts(categories[0]);
  }, [categories, getCategoryProducts]);

  return (
    <>
      <Navigation />
      <Container>
        <Flex>
          {!!categories &&
            categories.map((category) => (
              <CategoryItem
                onClick={() => {
                  setCategory(category);
                  getCategoryProducts(category);
                }}
                isCurrentCategory={currentCategory === category}
                key={category}
              >
                {category}
              </CategoryItem>
            ))}
        </Flex>
        <ProductsContainer>
          {!!categoryProducts &&
            categoryProducts.map((product) => (
              <ProductOutlook key={product.id} enableClick {...product} />
            ))}
        </ProductsContainer>
      </Container>
    </>
  );
};

export default CategoryPage;
