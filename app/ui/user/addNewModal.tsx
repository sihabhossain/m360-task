import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useCreateUserMutation } from "@/app/redux/userApiSlice";
import toast from "react-hot-toast";

interface AppProps {}

const AddNewModal: React.FC<AppProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  // Use the create user mutation hook
  const [createUser, { isLoading, isError }] = useCreateUserMutation();

  const handleSubmit = async () => {
    try {
      // Trigger the create user mutation
      const result = await createUser({ name, job });

      // Check if 'data' exists before accessing it
      if ("data" in result) {
        // Handle the response data as needed
        console.log("User created:", result.data);
        toast.success("User created");
      } else {
        console.error("Data not available:", result.error);
      }
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add New
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <form>
            <ModalHeader className="flex flex-col gap-1">
              Add New User
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                name="name"
                label="Name"
                placeholder="Enter user's name"
                variant="bordered"
              />
              <Input
                name="job"
                label="Job"
                placeholder="Enter user's job"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} color="primary" onPress={onClose}>
                Add User
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewModal;
