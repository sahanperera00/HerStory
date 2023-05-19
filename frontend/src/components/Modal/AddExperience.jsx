import { useState } from "react";
import { Modal } from "antd";

export default function AddExperience({
  isModalOpen2,
  setIsModalOpen2,
  handleAddExperience,
}) {
  const [employer, setEmployer] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    setEmployer("");
    setTitle("");
    setDuration("");
    setDescription("");

    setIsModalOpen2(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!employer || !title || !duration || !description) {
      alert("Please add all fields");
      return;
    }

    handleAddExperience(employer, title, duration, description);

    setEmployer("");
    setTitle("");
    setDuration("");
    setDescription("");

    setIsModalOpen2(false);
  };

  return (
    <Modal
      destroyOnClose={true}
      title="Add Professional Experience"
      className="font-semibold"
      open={isModalOpen2}
      onOk={onSubmit}
      onCancel={handleCancel}
    >
      <br />
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Employer
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Employer"
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Duration
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          type="text"
          rows="5"
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
