import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert as AlertChakra,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
  Box,
} from '@chakra-ui/core';

export const Types = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',

};

function Alert({
  show,
  setIsShowAlert,
  status,
  title,
  message,
  isCloseButton,
  timeout,
}) {
  const closeAlert = () => {
    setTimeout(() => {
      setIsShowAlert(false);
    }, timeout);
  };

  return (
    <>
      {show && (
      <Box
        top="10px"
        position="absolute"
      >
        <AlertChakra status={status}>
          <AlertIcon />
          <Flex flexDirection="column">
            <AlertTitle mr={2}>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Flex>
          {isCloseButton
       && <CloseButton position="absolute" right="8px" top="8px" />}
        </AlertChakra>
        {closeAlert()}
      </Box>
      )}
    </>
  );
}

Alert.prototype = {
  show: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  isCloseButton: PropTypes.bool,
  timeout: PropTypes.number,
};

Alert.defaultProps = {
  show: false,
  title: '',
  isCloseButton: false,
  timeout: 5000,
};

export default Alert;
