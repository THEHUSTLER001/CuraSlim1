import React from 'react';
import { motion } from 'framer-motion';
import bigimage from "../../assets/images/Pcard1.png"
const BigImageLeft = () => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{
        maxWidth: '500px',
        margin: '4rem auto',
        display: 'flex',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}
    >
      <img
        src={bigimage}
        alt="Left Product"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '10px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        }}
      />
    </motion.div>
  );
};

export default BigImageLeft;
