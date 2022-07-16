import React from 'react';
import github from '../images/github.png';
import CoffeeButton from '../components/CoffeeButton'

export default function Footer() {
  return(
    <div className="footer">
      <div className="footer-text">
        Don't forget to run  <mark>rails db:migrate</mark>    :)
      </div>
      <div className="footer-image">
      <a href="https://github.com/mckinney99/rails-helper">
          <img src={github} id="github" alt="github logo" />
        </a>
      </div>
      <CoffeeButton />
    </div>
  )
}
