import { Field, FieldArray, useFormik } from "formik";
import React from "react";
import { FaFileUpload } from "react-icons/fa";
const Createflashcard = () => {
  const formik = useFormik({
    initialValues: {
      creategroup: "",
      addDescription: "",
      groupImage: null,
      Terms: [
        {
          term: "",
          definition: "",
          image: null,
        },
      ],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  // Append the Terms above the Terms using Add more button
  const addTerms = (e) => {
    // const id = '';
    const lowerTerm = document.querySelector(".TermMain");
    const upperTerm = document.querySelector("#TermsContainer");
    const child = upperTerm.cloneNode(true);
    lowerTerm.appendChild(child);
  };
  return (
    <>
      <div className="box bg-white shadow-md mt-4 ml-24 h-60 w-3/4 border-2 rounded">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="form-div grid grid-cols-2">
            <div className="flex flex-col gap-2 ml-4">
              <label className=" text-gray-400">Create Group*</label>
              <input
                className="border border-gray-300 p-1 rounded"
                type="text"
                id="creategroup"
                name="creategroup"
                onChange={formik.handleChange}
                value={formik.values.creategroup}
              />
            </div>
            <div className="flex flex-col gap-2 ml-4 justify-center items-center ">
              <label htmlFor="fileInput">
                <div className="flex justify-center mt-6 items-center gap-2 border border-gray-300 hover:border-blue-300 rounded w-36 h-8">
                  <div className="text-blue-600">
                    <FaFileUpload />
                  </div>
                  <div className="text-blue-600">Upload Image</div>
                </div>
              </label>
              <input
                id="fileInput"
                type="file"
                name="groupImage"
                onChange={(event) =>
                  formik.setFieldValue(
                    "groupImage",
                    event.currentTarget.files[0]
                  )
                }
                className="hidden"
                accept=".png, .svg, .jpg, .jpeg"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-2 m-4">
              <label className=" text-gray-400">Add description</label>
              <textarea
                id="addDescription"
                name="addDescription"
                value={formik.values.addDescription}
                onChange={formik.handleChange}
                className="w-[40rem] h-28 border border-gray-300 rounded p-2"
                placeholder="Enter description..."
              ></textarea>
            </div>
          </div>
        </form>
      </div>
      <div className="terms TermMain relative bg-white shadow-md mt-4 ml-24 w-3/4 border-2 rounded p-4">
        <FieldArray name="terms">
          {({ push, remove, form }) => {
            // form === the same formik object
            const { setFieldValue } = form;
            <>
              {formik.values.Terms.map((_, index) => {
                <div id="TermsContainer" className="flex items-start gap-6">
                  {/* Term */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-400">Enter Term*</label>
                    <input
                      key={index}
                      name={`Terms[${index}].term`}
                      value={formik.values.Terms[index].term}
                      onChange={formik.handleChange}
                      className="border border-gray-300 p-2 rounded w-64"
                      type="text"
                    />
                  </div>

                  {/* Definition */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-gray-400">
                      Enter Definition*
                    </label>
                    <textarea
                      key={index}
                      name={`Terms[${index}].definition`}
                      onChange={formik.handleChange}
                      value={formik.values.Terms[index].definition}
                      className="border border-gray-300 p-2 rounded w-80 h-20 resize-none"
                    ></textarea>
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col mt-12">
                    <label
                      htmlFor="fileInput1"
                      className="flex justify-center items-center gap-2 border border-gray-300 rounded w-36 h-10 cursor-pointer hover:border-blue-500"
                    >
                      <div className="text-blue-600">Select Image</div>
                    </label>
                    <input
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue(`Terms[${index}].image`, file);
                      }}
                      name={`Terms[${index}].image`}
                      id="fileInput1"
                      type="file"
                      className="hidden"
                      accept=".png, .svg, .jpg, .jpeg"
                    />
                  </div>
                </div>;
              })}
            </>;
          }}
        </FieldArray>
        <h3
          onClick={addTerms}
          className="text-blue-800 absolute bottom-1 left-2 cursor-pointer hover:text-blue-700"
        >
          + Add more
        </h3>
        {/* <h3 onClick={addTerms} className="text-blue-800 absolute cursor-pointer hover:text-blue-700">
          - Delete
        </h3> */}
      </div>
      <div className="button flex justify-center items-center"></div>
      <div className="flex justify-center items-center m-4">
        <button className="bg-red-600 text-white rounded p-1 w-24">
          Create
        </button>
      </div>
    </>
  );
};

export default Createflashcard;
