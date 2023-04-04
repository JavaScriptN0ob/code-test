import { React } from 'react';
import styled from 'styled-components';

import EnquireForm from './components/EnquireForm';

const Container = styled.div`
  display: flex;
  flex-direction: 'row';
  border: 2px solid gray;
  margin: 30px;
  padding: 20px;
  position: relative;
`;

const Category = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const ProductNail = styled.div`
  margin-left: 100px;
  flex: 1;
  position: relative;
`;

const Title = styled.h1`
  font-weight: normal;
  margin: 0;
`;

const TextBox = styled.div`
  margin-top: 80px;
`;

const CallToAction = styled.button`
  cursor: pointer;
  width: 200px;
  height: 50px;
  position: absolute;
  bottom: 40px;
  right: 40px;
`;

const ProductDetail = ({
  id,
  title,
  description,
  category,
  image,
  rating,
  price,
}) => {
  const scrollToEnquiryForm = () => {
    const element = document.querySelector('#ENQUIRY_FORM');

    if (!element) {
      return;
    }

    element.scrollIntoView();
  };

  return (
    <>
      <Container>
        <div>
          <Category>category: {category}</Category>
          <ImageWrapper alt={`${title}-image`} src={image} />
        </div>
        <ProductNail>
          <Title>{title}</Title>
          <TextBox>{description}</TextBox>
          <TextBox>
            {`${rating && rating?.count} customers rated this product ${
              rating?.rate
            } out of 5`}
          </TextBox>
          <TextBox>Price: ${price}</TextBox>
          <CallToAction onClick={scrollToEnquiryForm}>Enquire</CallToAction>
        </ProductNail>
      </Container>
      <EnquireForm productId={id} />
    </>
  );
};

export default ProductDetail;
