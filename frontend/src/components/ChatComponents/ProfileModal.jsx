import React from 'react'
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Image,
  } from "@chakra-ui/react";

import { Link } from 'react-router-dom';

const ProfileModal = ({user, children}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <div> {children ? <span onClick={onOpen}>{children}</span> : <IconButton display={{base: "flex"}} icon={<ViewIcon/>} onClick={onOpen}/>}
        <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            d="flex"
            justifyContent="center"
          >
            <Link to='/client'>
            {user.user.firstName} {user.user.lastName}
            </Link>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.user.pic}
              alt={user.user.firstName}
            />
            <Text 
            pt={'10px'}
              fontSize={{ base: "28px", md: "30px" }}
            >
              Email: {user.user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileModal