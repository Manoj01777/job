import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Initialize Quill only once
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="mb-2 w-full max-w-lg">
        <p>Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full px-3 py-2 border-2 border-gray-300 rounded"
        />
      </div>
      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div
          ref={editorRef}
          style={{
            height: "60px", // Set height for Quill editor
            border: "1px solid #d1d5db", // Matches the border style of the input
            borderRadius: "0.375rem", // Matches rounded corners
            padding: "0.5rem", // Matches padding
          }}
        ></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2"> Job Category</p>
          <select className="w-full px-3 py-2  border-2 border-gray-300 rounded"  onChange={(e) => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Locations</p>
          <select className="w-full px-3 py-2  border-2 border-gray-300 rounded" onChange={(e) => setCategory(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option value={location} key={index}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level</p>
          <select className="w-full px-3 py-2  border-2 border-gray-300 rounded"  onChange={(e) => setCategory(e.target.value)}>
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>
      <div>
        <p className="mb-2">Job Salary</p>
        <input className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]" min={0}
          type="number"
          placeholder="25000"
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white">Add</button>
    </form>
  );
};

export default AddJob;
