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
import { useUpdateUserMutation } from "@/app/redux/userApiSlice";
import toast from "react-hot-toast";

interface AddNewModalProps {
  userId: number; // Replace with the actual type of userId
}

const EditUserModal: React.FC<AddNewModalProps> = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  // Use the update user mutation hook
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const handleSubmit = async () => {
    try {
      if (!name || !job) {
        toast.error("Please fill out both name and job fields.");
        return;
      }

      // Trigger the update user mutation
      const result = await updateUser({
        id: userId,
        updatedUserData: { name, job },
      });

      // Handle the response data as needed
      if ("data" in result) {
        console.log("User updated:", result.data);
        toast.success("User updated");
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      toast.error("Error updating user");
    } finally {
      onClose();
    }
  };

  return (
    <>
      <p onClick={onOpen}>Update</p>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <form>
            <ModalHeader className="flex flex-col gap-1">
              Update user
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                name="name"
                label="Name"
                placeholder="Enter user's name"
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                name="job"
                label="Job"
                placeholder="Enter user's job"
                variant="bordered"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Update user
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserModal;
