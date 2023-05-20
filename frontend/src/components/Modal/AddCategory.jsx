import { useState } from "react";
import { Modal } from "antd";
import axios from "axios";

export default function AddCategory({
  isModalOpen,
  setIsModalOpen,
  state,
  setState,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    setName("");
    setDescription("");

    setIsModalOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }

    await axios.post(
      "http://localhost:8070/category",
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setName("");
    setDescription("");

    setState(!state);
    setIsModalOpen(false);
  };

  return (
    <Modal
      destroyOnClose={true}
      title="Add Category"
      className="font-semibold"
      open={isModalOpen}
      onOk={onSubmit}
      onCancel={handleCancel}
    >
      <br />
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
    </Modal>
  );
}
