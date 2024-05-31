import { Box, Container, Flex, Heading, HStack, Spacer, Text, VStack, Avatar, Badge, Input, InputGroup, InputLeftElement, Button, Textarea, Stack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaHome, FaUser, FaHeart, FaComment, FaBars, FaTimes, FaEdit, FaCamera, FaTrash } from "react-icons/fa";

const NavBar = ({ onMenuClick, isMenuOpen }) => {
  return (
    <Flex as="nav" bg="gray.800" color="white" p={4} align="center">
      <HStack spacing={4}>
        <IconButton aria-label="Home" icon={<FaHome />} />
        <IconButton aria-label="Profile" icon={<FaUser />} />
        <IconButton aria-label="Matches" icon={<FaHeart />} />
        <IconButton aria-label="Messages" icon={<FaComment />} />
      </HStack>
      <Spacer />
      <IconButton aria-label="Menu" icon={isMenuOpen ? <FaTimes /> : <FaBars />} onClick={onMenuClick} display={{ base: "block", md: "none" }} />
    </Flex>
  );
};

const MainSection = () => {
  const [matches, setMatches] = useState([
    { id: 1, name: "Alice", age: 25, bio: "Looking for a good time", images: ["https://randomuser.me/api/portraits/women/1.jpg"] },
    { id: 2, name: "Bob", age: 28, bio: "Loves hiking and dogs", images: ["https://randomuser.me/api/portraits/men/1.jpg"] },
  ]);

  return (
    <VStack spacing={8} w="full" maxW="container.xl" p={4}>
      <Heading as="h2" size="lg">Potential Matches</Heading>
      {matches.map(match => (
        <Box key={match.id} p={4} borderWidth="1px" borderRadius="lg" w="full">
          <HStack spacing={4}>
            <Avatar size="xl" src={match.images[0]} />
            <VStack align="start" spacing={0}>
              <Text fontSize="2xl">{match.name}, {match.age}</Text>
              <Text>{match.bio}</Text>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

const ProfileSection = () => {
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState(30);
  const [bio, setBio] = useState("Just a regular person");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages([...images, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <VStack spacing={8} w="full" maxW="container.md" p={4}>
      <Heading as="h2" size="lg">Edit Profile</Heading>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      <Textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Stack direction="row" spacing={4}>
        {images.map((image, index) => (
          <Box key={index} pos="relative">
            <IconButton aria-label="Remove Image" icon={<FaTrash />} onClick={() => handleImageRemove(index)} pos="absolute" top={1} right={1} />
            <img src={image} alt={`Image ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
          </Box>
        ))}
      </Stack>
      <Button leftIcon={<FaEdit />} colorScheme="teal" variant="solid">Save Changes</Button>
    </VStack>
  );
};

const MessagingSection = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how's it going?", fromMe: false },
    { id: 2, text: "Pretty good, you?", fromMe: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, fromMe: true }]);
    setNewMessage("");
  };

  return (
    <VStack spacing={4} w="full" maxW="container.md" p={4}>
      <Heading as="h2" size="lg">Chat</Heading>
      <Stack spacing={4} direction="column-reverse">
        {messages.map(message => (
          <Box key={message.id} p={2} bg={message.fromMe ? "teal.500" : "gray.200"} color={message.fromMe ? "white" : "black"} borderRadius="md" alignSelf={message.fromMe ? "flex-end" : "flex-start"}>
            {message.text}
          </Box>
        ))}
      </Stack>
      <InputGroup>
        <InputLeftElement>
          <IconButton aria-label="Send" icon={<FaEdit />} onClick={handleSend} />
        </InputLeftElement>
        <Input placeholder="Type a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      </InputGroup>
    </VStack>
  );
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box>
      <NavBar onMenuClick={handleMenuClick} isMenuOpen={isMenuOpen} />
      <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="start" alignItems="start">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Menu</ModalHeader>
            <ModalBody>
              <VStack spacing={4} align="start">
                <Button leftIcon={<FaHome />} variant="ghost" isFullWidth>Home</Button>
                <Button leftIcon={<FaUser />} variant="ghost" isFullWidth>Profile</Button>
                <Button leftIcon={<FaHeart />} variant="ghost" isFullWidth>Matches</Button>
                <Button leftIcon={<FaComment />} variant="ghost" isFullWidth>Messages</Button>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex w="full" maxW="container.xl" p={4}>
          <IconButton aria-label="Menu" icon={<FaBars />} onClick={onOpen} display={{ base: "block", md: "none" }} />
          <Spacer />
          <Heading as="h1" size="2xl">Dating App</Heading>
          <Spacer />
        </Flex>
        <Flex w="full" maxW="container.xl" p={4}>
          <Box w="full">
            <MainSection />
            <ProfileSection />
            <MessagingSection />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Index;