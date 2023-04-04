import React, { useState, useCallback } from 'react';
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
  justify-content: center;
`;

const CustomInput = styled.input`
  height: 26px;
`;

const Search = styled.button`
  cursor: pointer;
  margin-left: 30px;
  width: 100px;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [searchInputDirty, setSearchInputDirty] = useState(false);
  const [isResultNotFound, setIsResultNotFound] = useState(false);

  const handleChange = useCallback((event) => {
    const {
      target: { value },
    } = event;

    setSearchInput(value);

    if (!value) {
      setSearchInputDirty(false);
    }
  }, []);

  const getSearchResult = useCallback(() => {
    const getSearchedProduct = async () => {
      try {
        const { data } = await axiosInstance.get(
          `products?searchInput=${searchInput}`
        );

        setSearchResult(data);
        setLoading(false);
        setIsResultNotFound(false);
      } catch (error) {
        setLoading(false);
        setIsResultNotFound(false);

        if (error.response.status === 404) {
          setIsResultNotFound(true);
        }
      }
    };

    getSearchedProduct();
  }, [searchInput]);

  const handleSearchClick = useCallback(() => {
    setSearchResult(undefined);
    setLoading(true);
    setSearchInputDirty(true);

    getSearchResult();
  }, [getSearchResult, setLoading, setSearchInputDirty]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <Flex>
          <CustomInput
            onChange={handleChange}
            value={searchInput}
            onKeyDown={handleKeyPress}
          />
          <Search onClick={handleSearchClick}>Search</Search>
        </Flex>
        <ProductsContainer>
          <div>{!!loading ? 'loading.....' : ''}</div>
          <div>
            {!loading &&
              !!isResultNotFound &&
              !!searchInputDirty &&
              'No matched product found, please try again.'}
          </div>
          {!!searchResult &&
            searchResult.map((product) => (
              <ProductOutlook key={product.id} enableClick {...product} />
            ))}
        </ProductsContainer>
      </Container>
    </>
  );
};

export default SearchPage;
