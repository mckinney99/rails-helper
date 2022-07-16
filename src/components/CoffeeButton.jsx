import React from 'react';
import styled from 'styled-components';

const Button = styled.a`
  height: 1.5rem;
  text-decoration: none;
  display:inline-flex;
  color: #414141;
  background-color: #ececec;
  border-radius: 5px;
  padding: 0px 7px;
  font-size: 2rem;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  transition: 0.3s all linear;
  &:hover, &:active, &:focus {
    text-decoration: none;
    box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
    opacity: 0.85;
    color:#FFFFFF;
  }
`;

const Image = styled.img``;

const Text = styled.span`
  font-size: 1rem;
`;

function CoffeeButton() {
  return (
    <Button target="_blank" href="https://www.buymeacoffee.com/mckinney99">
      <Image src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
      <Text>Buy me a coffee</Text>
    </Button>
  );
}

export default CoffeeButton;
