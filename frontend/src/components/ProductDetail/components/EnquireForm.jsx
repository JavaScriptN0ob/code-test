import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../../api/axiosInstance';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InputGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid gray;
  margin: 200px 0;
  width: 500px;
  padding: 20px;
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 10px 5px;
  padding: 25px 5px 5px 10px;
  width: 250px;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 5px;
  font-size: 20px;
`;

const CustomInput = styled.input`
  font-size: 18px;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  height: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 40px;
`;

const CustomButton = styled.button`
  cursor: pointer;
  width: 200px;
  height: 50px;
`;

const Input = ({ label, data, handleChange, error }) => {
  return (
    <InputContainer>
      <Label>{label}:</Label>
      <CustomInput
        value={data[label]}
        onChange={(event) => handleChange(event, label)}
      />
      {<Error>{error}</Error>}
    </InputContainer>
  );
};

const EnquireForm = ({ productId }) => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const initialFormError = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  };
  const [formError, setFormError] = useState(initialFormError);
  const errorHandler = (value, key) => {
    if (!value) {
      return `${key} value can't be empty.`;
    }

    return '';
  };

  const [enableSubmit, setEnableSubmit] = useState(false);

  const inputList = ['firstName', 'lastName', 'email', 'mobile'];

  const handleChange = (event, key) => {
    const {
      target: { value },
    } = event;

    setFormData({
      ...formData,
      [key]: value,
    });
    setFormError({
      ...formError,
      [key]: '',
    });
    setEnableSubmit(true);
  };

  const navigate = useNavigate();

  const submitForm = useCallback(() => {
    const postEnquiryForm = async () => {
      try {
        const { status } = await axiosInstance.post('/enquiry', {
          productId,
          customerDetails: formData,
        });

        if (status === 201) {
          navigate('/post-sale');
        }
      } catch (error) {
        if (error.response.status === 405) {
          setEnableSubmit(false);
        }

        console.warn('Enquiry failed, please try again later.');
      }
    };

    postEnquiryForm();
  }, [productId, formData, navigate]);

  const handleSubmit = useCallback(() => {
    const formErrors = Object.keys(formData).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: errorHandler(formData[cur], cur),
      };
    }, {});
    setFormError(formErrors);

    enableSubmit && submitForm();
  }, [formData, submitForm, enableSubmit]);

  return (
    <Container>
      <InputGroupContainer id="ENQUIRY_FORM">
        {/* <Input label="firstName" data={formData} handleChange={handleChange} />
        <Input label="lastName" data={formData} handleChange={handleChange} />
        <Input label="email" data={formData} handleChange={handleChange} />
        <Input label="mobile" data={formData} handleChange={handleChange} /> */}
        {inputList.map((input) => (
          <Input
            key={input}
            label={input}
            data={formData}
            handleChange={handleChange}
            error={formError[input]}
          />
        ))}
        <ButtonContainer>
          <CustomButton onClick={() => setFormData(initialFormData)}>
            Clear
          </CustomButton>
          <CustomButton onClick={handleSubmit} disabled={!enableSubmit}>
            Submit
          </CustomButton>
        </ButtonContainer>
      </InputGroupContainer>
    </Container>
  );
};

export default EnquireForm;
