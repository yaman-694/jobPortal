import React, { useState } from 'react'
import down from '../../assets/svg/down.svg'
import up from '../../assets/svg/up.svg'
import { Svg } from './Svg'

interface AccordionProps {
  title: string
  children: React.ReactNode
  className?: string
}

const AccordionIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <span className="accordion__icon">
      {isOpen ? <Svg path={up} /> : <Svg path={down} />}
    </span>
  )
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={`accordion ${className ? className : ''}`}
      style={{
        overflow: 'hidden',
        transition: 'max-height 0.6s ease',
        maxHeight: isOpen ? '1000px' : '70px'
      }}>
      <div
        className="accordion-header"
        onClick={toggleAccordion}
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease'
        }}>
        <span className="status__heading">{title}</span>
        <AccordionIcon isOpen={isOpen} />
      </div>
      <div className="accordion-content" style={{
        overflowY: 'scroll',
        maxHeight: '800px',
        paddingBottom: '2rem'
      }}>{children}</div>
    </div>
  )
}

export default Accordion
