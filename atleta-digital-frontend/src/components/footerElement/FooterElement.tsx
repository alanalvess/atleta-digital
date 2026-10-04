import {Footer, FooterCopyright, FooterDivider, FooterLinkGroup} from 'flowbite-react';

import {CiCalculator2} from "react-icons/ci";
import {useState} from "react";
import {Link} from "react-router-dom";

function FooterElement() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <Footer container className='rounded-none bg-gray-300 w-full overflow-x-auto'>
      <div className='w-full px-4'>
        <div className='w-full flex flex-row justify-between items-center'>
          <FooterLinkGroup className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <Link to='/duvidas'>Dúvidas e Tutoriais</Link>
            <Link to='/sobre'>Sobre o Dia A+</Link>
          </FooterLinkGroup>

        </div>

        <FooterDivider/>

        <div className="flex justify-center w-full">
          <Link to="/">
            <FooterCopyright
              by='Dia A+™'
              year={2025}
            />
          </Link>
        </div>
      </div>
    </Footer>
  );
}

export default FooterElement;