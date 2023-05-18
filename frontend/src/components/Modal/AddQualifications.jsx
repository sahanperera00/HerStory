import { useState } from "react";
import { Modal } from "antd";

export default function AddQualifications({
  isModalOpen1,
  setIsModalOpen1,
  handleAddQualifications,
}) {
  const [university, setUniversity] = useState("");
  const [type, setType] = useState("");
  const [field, setField] = useState("");
  const [graduated, setGraduated] = useState("");

  const handleCancel = () => {
    setUniversity("");
    setType("");
    setField("");
    setGraduated("");

    setIsModalOpen1(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!university || !type || !field || !graduated) {
      alert("Please add all fields");
      return;
    }

    handleAddQualifications(university, type, field, graduated);
    
    setUniversity("");
    setType("");
    setField("");
    setGraduated("");

    setIsModalOpen1(false);
  };

  return (
    <Modal
      destroyOnClose={true}
      title="Add Educational Qualification"
      className="font-semibold"
      open={isModalOpen1}
      onOk={onSubmit}
      onCancel={handleCancel}
    >
      <br />
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          University
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Type
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Field
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Graduated
        </label>
        <input
          type="date"
          className="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border rounded shadow appearance-none dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:shadow-outline"
          placeholder="Graduated"
          value={graduated}
          onChange={(e) => setGraduated(e.target.value)}
          required
        />
      </div>
    </Modal>
  );
}
