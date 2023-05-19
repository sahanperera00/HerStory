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
            display="flex"
            justifyContent="center"
          >
            <Link to='/client'>
            {user.firstName} {user.lastName}
            </Link>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            justifyContent="center"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.firstName}
              display="flex"
              justifyContent={"center"}
            />
            <Text 
            pt={'10px'}
            display={"flex"} justifyContent={"center"} 
              fontSize={{ base: "28px", md: "30px" }}
            >
              Email: {user.email}
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