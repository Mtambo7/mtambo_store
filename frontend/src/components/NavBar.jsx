import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {  IoMoonOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px "} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="bold"
        >
          <Link to={"/"}>Mtambo Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <>
                Dark <IoMoonOutline size="20" />
              </>
            ) : (
              <>
                Light <LuSun size="20" />
              </>
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
