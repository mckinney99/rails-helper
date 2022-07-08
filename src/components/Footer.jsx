import React from 'react';
import {Container, Row, Col, Nav} from 'react-bootstrap';
import github from '../images/github.png';

export default function Footer() {
  return(
    <>
          <a href="https://github.com/mckinney99">
            <img src={github} id="github" alt="github logo" />
          </a>
    </>
  )
}
