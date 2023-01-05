import React, { useState, useRef } from "react";

const defaultStudents = JSON.parse(localStorage.getItem("students")) || [];

const storeToStorage = (students) => {
  localStorage.setItem("students", JSON.stringify(students));
};

function App() {
  const [students, setStudents] = useState(defaultStudents);
  const [name, setName] = useState("");
  const [showCart, setShowCart] = useState(false);

  const studentRef = useRef();

  const openMenu = (e) => {
    e.preventDefault();
    setShowCart(!showCart);
    studentRef.current.classList.remove("animate-fade-in");
    studentRef.current.classList.add("animate-fade-out");
  };

  const updateStudents = (newStudent) => {
    storeToStorage(newStudent);
    setStudents(newStudent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      return;
    }
    const newStudent = {
      text: name,
      selected: false,
    };

    const newStudents = [...students, newStudent];

    updateStudents(newStudents);
    alert(`${name} added to list of students.`);
    setName("");

    studentRef.current.classList.add("animate-fade-out");

    setTimeout(() => {
      setShowCart(false);
    }, 100);
  };

  const randomSearch = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(randomItem, 100 * i + 100);
    }
  };

  const randomItem = () => {
    const randomItem = students[Math.floor(Math.random() * students.length)];

    const newStudents = students.map((item) =>
      item === randomItem
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );

    updateStudents(newStudents);
  };

  const closeModal = () => {
    studentRef.current.classList.add("animate-fade-out");
    setTimeout(() => {
      setShowCart(false);
    }, 100);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mb-4">Random Student</h1>
        <div className="h-auto p-6">
          <button
            className="bg-blue-800 w-full hover:bg-blue-900 text-white my-8 py-2 px-4"
            type="button"
            onClick={(e) => openMenu(e)}
          >
            Додати студента
          </button>
        </div>
      </div>

      {showCart && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-indigo-500 opacity-50"
              onClick={() => setShowCart(false)}
            ></div>

            <div
              onClick={(event) => event.stopPropagation()}
              className="flex items-center min-h-screen px-4 py-8"
            >
              <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3">
                  <div className="mt-2 text-center sm:text-left">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl text-gray-800">Modal title</h2>
                      <button
                        type="button"
                        className="buttonClose"
                        onClick={closeModal}
                      >
                        <svg className="icon icon-cross" viewBox="0 0 32 32">
                          <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                        </svg>
                      </button>
                    </div>

                    <hr />
                    <form onSubmit={handleSubmit} className="flex flex-col ">
                      <label className="w-full py-4">
                        Ім'я студента
                        <input
                          className="py-2 mt-2 mb-6 px-4 border border-gray-500 w-full rounded"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />
                      </label>
                      <hr />
                      <div className="items-center gap-2 mt-3 sm:flex">
                        <button
                          onClick={closeModal}
                          className="w-full mt-2 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 py-2 px-4"
                        >
                          Відміна
                        </button>
                        <button
                          type="submit"
                          className="w-full mt-2 flex-1 rounded-md outline-none border bg-blue-800 hover:bg-blue-900 text-white py-2 px-4"
                        >
                          Додати
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col items-center justify-center">
        <ul className="container" ref={studentRef}>
          {students.map((student, idx) => (
            <li
              className={`select-none cursor-pointer border border-blue-500 hover:bg-red-500 p-2 text-center ${
                student.selected ? "bg-red-800 text-white" : ""
              }`}
              key={idx}
            >
              {student.text}
            </li>
          ))}
        </ul>

        <button
          className="bg-indigo-500 w-full hover:bg-indigo-700 text-white my-8 py-2 px-4"
          onClick={randomSearch}
        >
          Вибрати студента
        </button>
      </div>
    </>
  );
}

export default App;
