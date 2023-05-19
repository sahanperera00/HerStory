import { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";

export default function UpdateCategory({
  setUpdateModalOpen,
  updateModalOpen,
  category,
  state,
  setState,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    setName("");
    setDescription("");

    setUpdateModalOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `http://localhost:8070/category/${category._id}`,
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
    setUpdateModalOpen(false);
  };

  useEffect(() => {
    setName(category.name);
    setDescription(category.description);
  }, []);

  return (
    <Modal
      destroyOnClose={true}
      title="Update Category"
      className="font-semibold"
      open={updateModalOpen}
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
          defaultValue={category.name}
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
          defaultValue={category.description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
    </Modal>
  );
}
