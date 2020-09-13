import React, { useRef } from 'react';

import { FormControl, FormLabel, Input, Button, Flex } from '@chakra-ui/core';
import api from '../services/api';

const Paginatest = ({ history }) => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const { value: email } = emailRef.current
    const { value: password } = passwordRef.current

    if (email && password){
      const data = {
        email: email,
        password: password
      }

      api.post('store', data)
    }
    
  }

 return (
  <>
   <Flex flexDirection="column" justify="center" align="center" >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="fname">Email</FormLabel>
          <Input id="fname" placeholder="email" ref={emailRef} />
          <FormLabel htmlFor="fname">Password</FormLabel>
          <Input id="fname" placeholder="password" ref={passwordRef} />
        </FormControl>
        <Button
            mt={4}
            variantColor="teal"
            type="submit"
          >
            Submit
          </Button>
      </form>
   </Flex>
   <Button onClick={() => history.push('/')}>Voltar para listagem</Button>
  </>
)};

export default Paginatest;
