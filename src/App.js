/* eslint-disable eqeqeq */
import { useState } from "react";

const App = () => {
  const [grade, setGrade] = useState(null);
  const [credit, setCredit] = useState(null);
  const [gpaArr, setGpaArr] = useState([]);

  const handleAdd = () => {
    if (!credit || !grade || credit <= 0 || grade <= 0) {
      alert("Should not be null or 0 or any negetive value");
      return;
    }
    if (grade > 4) {
      alert("Gpa should not large than 4");
      return;
    }
    setGpaArr([...gpaArr, { grade, credit, id: gpaArr.length }]);
    calculation();
    setCredit("");
    setGrade("");
  };
  const handleRemove = (id) => {
    setGpaArr(gpaArr.filter((item) => item.id !== id));
  };
  const calculation = () => {
    let gradeCreditMultiply = 0;
    let totalCredit = 0;
    for (let item of gpaArr) {
      let multiply = parseFloat(item.credit) * parseFloat(item.grade);
      gradeCreditMultiply += multiply;
      totalCredit += parseFloat(item.credit);
    }
    return (gradeCreditMultiply / totalCredit).toFixed(2);
  };
  return (
    <div className="bg-black absolute w-full h-full flex justify-center items-center">
      <div className="lg:w-1/3 bg-white p-10 mx-1">
        <h1 className="text-center font-bold uppercase text-3xl my-10">
          CGPA CALCULATOR
        </h1>
        <div className="text-center">
          <h1 className="font-bold text-xl my-4 bg-gray-200 py-4 shadow rounded-lg">
            CGPA:{" "}
            <span
              className={
                calculation() > 3.5
                  ? "text-green-500"
                  : calculation() > 3.0
                  ? "text-yellow-600"
                  : "text-red-500"
              }
            >
              {isNaN(calculation()) ? 0 : calculation()}
            </span>
          </h1>
        </div>
        <ol className="list-decimal ">
          {gpaArr.map((item) => (
            <div className=" list-item">
              <li className="grid grid-cols-3 gap-3 border p-3 m-5">
                <p>Grade: {item.grade}</p>
                <p>Credit: {item.credit}</p>
                <p className="text-right">
                  <span
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-600 inline-block px-1 text-white font-bold hover:bg-red-800 hover:text-gray-400 cursor-pointer"
                  >
                    &times;
                  </span>
                </p>
              </li>
            </div>
          ))}
        </ol>
        <div className="mx-4 lg:mx-auto lg:w-2/3 grid grid-cols-3 gap-5">
          <input
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Grade"
            value={grade}
            className="border-black border px-1"
            type="number"
          />
          <input
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            placeholder="Credit"
            className="border-black border px-1"
            type="number"
          />
          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-indigo-800 text-white uppercase font-bold rounded hover:bg-indigo-900"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
