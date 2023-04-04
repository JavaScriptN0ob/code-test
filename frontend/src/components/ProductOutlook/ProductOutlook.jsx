import { React, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: 'row';
  border: 2px solid gray;
  margin: 30px;
  padding: 20px;
  position: relative;
`;

const Box = styled.div`
  width: 200px;
  margin-bottom: ${(props) => props.mb};
  margin-left: ${(props) => props.ml};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;

const ImageWrapper = styled.img`
  width: 200px;
  height: 200px;
`;

const HoveredContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 460px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DetailRoute = styled.div`
  border: 2px solid white;
  border-radius: 4px;
  padding: 2px 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 48px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
`;

const ProductOutlook = ({
  id,
  title,
  category,
  image,
  rating,
  enableClick,
}) => {
  const { rate, count } = rating;

  const [hover, setHover] = useState(false);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ImageWrapper alt={`${title}-image`} src={image} />
      <Box ml="20px">
        <Box mb="30px" bold>
          {title}
        </Box>
        <Box mb="30px">category: {category}</Box>
        <Box mb="10px">{`${count} customers rate ${rate} for this product.`}</Box>
      </Box>
      {!!enableClick && hover && (
        <HoveredContainer>
          <CustomNavLink to={`/product/${id}`}>
            <DetailRoute>details</DetailRoute>
          </CustomNavLink>
        </HoveredContainer>
      )}
    </Container>
  );
};

export default ProductOutlook;
