import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { FaFileUpload } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { uploadToCloudinary } from "../Upload/uploadToCloudinary";
// used for celebration effect
import Confetti from "react-confetti";

const Createflashcard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // fileinput ref used for indirectly trigger the input
  const termImageRef = useRef([]); //fileinput ref used for indirectly trigger the inputs
  const [status, setStatus] = useState(false);
  /* --------------------------------------------
     Formik setup
     --------------------------------------------
     NOTE:
     - "Terms" must match FieldArray name exactly
     - Formik manages ALL state (no DOM manipulation)
  --------------------------------------------- */
  const handleTermImage = (index) => {
    if (termImageRef.current[index]) {
      termImageRef.current[index].value = "";
      termImageRef.current[index].click();
    }
  };

  // handle the submision of the form button so that it will disappear when the form is submited
  // const handleClick = () => {};

  // delete the Image of specific term
  const handleTermDelete = (index) => {
    formik.setFieldValue(`Terms[${index}].image`, null);
  };
  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  //form validattion using formik start

  const validate = (values) => {
    const errors = {};
    if (!values.creategroup) {
      errors.creategroup = "Please add the creategroup !";
    } else if (values.creategroup.length < 3) {
      errors.creategroup = "createGroup should be atleast 3 character !";
    }

    if (!values.addDescription) {
      errors.addDescription = "Please Add Description !";
    } else if (values.addDescription.length < 20) {
      errors.addDescription = "Description should be more than 20 characters !";
    }

    const termsErrors = {};
    values.Terms.forEach((item, index) => {
      const itemErros = {};
      if (!item.term) {
        itemErros.term = "Please add Term !";
      } else if (item.term.length < 3) {
        itemErros.term = "Please add more that 3 characters !";
      }
      if (!item.definition) {
        itemErros.definition = "Please add Definition !";
      } else if (item.definition.length < 15) {
        itemErros.definition = "Please add more that 15 characters !";
      }
      if (Object.keys(itemErros).length > 0) {
        termsErrors[index] = itemErros;
      }
    });

    if (Object.keys(termsErrors).length > 0) {
      errors.Terms = termsErrors;
    }
    return errors;
  };
  //form validattion using formik end

  // formik initialization starts
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
    validate: validate,
    onSubmit: async (values, { resetForm }) => {
      setStatus(true); // set the confetti to true
      setTimeout(() => {
        setStatus(false);
        navigate("/myflashcard");
      }, 3000);
      const groupImageurl = values.groupImage
        ? await uploadToCloudinary(values.groupImage)
        : null;

      const termsWithurl = await Promise.all(
        values.Terms.map(async (t) => ({
          ...t,
          image: t.image ? await uploadToCloudinary(t.image) : null,
        }))
      );

      const newFlashcard = {
        id: Date.now(),
        creategroup: values.creategroup,
        addDescription: values.addDescription,
        groupImage: groupImageurl,
        Terms: termsWithurl,
      };

      console.log(newFlashcard);
      const existing = JSON.parse(localStorage.getItem("flashcards")) || [];

      localStorage.setItem(
        "flashcards",
        JSON.stringify([...existing, newFlashcard])
      );
      console.log(localStorage.getItem("flashcards"));
      resetForm();
    },
  });
  // formik initialization end
  return (
    <>
      {/* ===================== GROUP DETAILS ===================== */}
      <div className="box mt-4 sm:ml-24 ml-4 w-4/5 sm:w-3/4 rounded">
        {status && (
          <Confetti
            numberOfPieces={400}
            gravity={0.9} // ⬅ faster fall
            wind={0.2} // ⬅ sideways speed
            initialVelocityX={20}
            initialVelocityY={25}
            recycle={false}
          />
        )}
        {/* IMPORTANT:
           Button must be inside <form> to trigger submit */}
        <FormikProvider value={formik}>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="form-div bg-white grid grid-cols-2 dark:bg-gray-800">
              {/* ---------- Create Group ---------- */}
              <div className="flex flex-col gap-2 ml-4">
                <label className=" text-gray-400">Create Group*</label>
                <input
                  className="border border-gray-300 rounded dark:bg-gray-900 dark:text-white"
                  type="text"
                  name="creategroup"
                  onChange={formik.handleChange}
                  value={formik.values.creategroup}
                />
                {formik.touched.creategroup && formik.errors.creategroup && (
                  <p className="text-red-500 text-sm ml-2 font-semibold">
                    {formik.errors.creategroup}
                  </p>
                )}
              </div>

              {/* ---------- Group Image Upload ---------- */}

              <div className="flex flex-col gap-2 ml-4 justify-center items-center ">
                {/* Html for should be same as id of the input */}
                {!formik.values.groupImage && (
                  <>
                    <label htmlFor="groupImage">
                      <div className="flex justify-center mt-6 items-center gap-2 border border-gray-300 hover:border-blue-300 rounded w-32 h-8 translate-y-1 -translate-x-3">
                        <div className="text-blue-600">
                          <FaFileUpload />
                        </div>
                        <div className="text-blue-600">Upload Image</div>
                      </div>
                    </label>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  id="groupImage"
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  className="hidden"
                  onChange={(event) =>
                    formik.setFieldValue(
                      "groupImage",
                      event.currentTarget.files[0]
                    )
                  }
                />

                {formik.values.groupImage && (
                  <div className="flex gap-2 justify-center items-center">
                    <img
                      src={URL.createObjectURL(formik.values.groupImage)}
                      alt="Group Preview"
                      className="w-auto h-16 mt-3 object-cover rounded border"
                    />
                    {/* <div className="add"></div> */}
                    <FaEdit
                      onClick={handleEdit}
                      className="text-gray-500 text-2xl"
                      title="Upload New"
                    />
                  </div>
                )}
              </div>

              {/* ---------- Description ---------- */}

              <div className="flex flex-col gap-2 col-span-2 m-4">
                <label className=" text-gray-400">Add description</label>
                <textarea
                  name="addDescription"
                  value={formik.values.addDescription}
                  onChange={formik.handleChange}
                  className="sm:w-[40rem] w-auto h-20 border border-gray-300 rounded p-2 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter description..."
                />
                {formik.touched.addDescription &&
                  formik.errors.addDescription && (
                    <p className="text-red-500 text-sm ml-2 font-semibold">
                      {formik.errors.addDescription}
                    </p>
                  )}
              </div>
            </div>

            {/* Terms Section */}

            <div className="terms TermMain relative bg-white shadow-md mt-4 w-full border-2 rounded p-4 dark:bg-gray-800">
              <FieldArray name="Terms">
                {({ push }) => (
                  <>
                    {formik.values.Terms.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start sm:gap-6 gap-2 sm:flex-row flex-col"
                      >
                        {/* Term */}
                        <span className="bg-red-500 rounded-full sm:w-8 sm:h-8 w-8 h-8 translate-y-7 flex justify-center items-center mb-8">
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <label className="mb-1 text-gray-400">
                            Enter Term*
                          </label>
                          <input
                            name={`Terms[${index}].term`}
                            value={item.term}
                            onChange={formik.handleChange}
                            className="border border-gray-300 p-2 rounded h-8 sm:w-64 w-32 dark:bg-gray-900 dark:text-white"
                            type="text"
                          />
                          {formik.touched.Terms?.[index]?.term &&
                            formik.errors.Terms?.[index]?.term && (
                              <p className="text-red-500 text-sm ml-2 font-semibold">
                                {formik.errors.Terms[index].term}
                              </p>
                            )}
                        </div>

                        {/* Definition */}
                        <div className="flex flex-col">
                          <label className="mb-1 text-gray-400">
                            Enter Definition*
                          </label>
                          <textarea
                            name={`Terms[${index}].definition`}
                            onChange={formik.handleChange}
                            value={item.definition}
                            className="border border-gray-300 p-2 rounded sm:w-80 sm:h-20 w-auto resize-none dark:bg-gray-900  dark:text-white"
                          />
                          {formik.touched.Terms?.[index]?.definition &&
                            formik.errors.Terms?.[index]?.definition && (
                              <p className="text-red-500 text-sm ml-2 font-semibold">
                                {formik.errors.Terms[index].definition}
                              </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        {!item.image && (
                          <div className="flex flex-col sm:mt-12 mb-8">
                            <label
                              htmlFor={`termImage-${index}`}
                              className="flex justify-center items-center gap-2 border border-gray-300 rounded w-36 h-10 cursor-pointer hover:border-blue-500"
                            >
                              <div className="text-blue-600">Select Image</div>
                            </label>
                          </div>
                        )}
                        <input
                          ref={(el) => (termImageRef.current[index] = el)}
                          onChange={(event) => {
                            formik.setFieldValue(
                              `Terms[${index}].image`,
                              event.currentTarget.files[0]
                            );
                          }}
                          id={`termImage-${index}`}
                          type="file"
                          className="hidden"
                          accept=".png, .svg, .jpg, .jpeg"
                        />
                        {item.image && (
                          <div className="flex gap-2 justify-center items-center translate-y-4 mb-8">
                            <img
                              src={URL.createObjectURL(item.image)}
                              alt="Group Preview"
                              className="w-auto h-20 mt-3 object-cover rounded border"
                            />
                            {/* <div className="add"></div> */}
                            <div className="flex flex-col gap-4">
                              <FaEdit
                                className="text-gray-500 text-2xl"
                                onClick={() => {
                                  handleTermImage(index);
                                }}
                                title="Upload New"
                              />
                              <MdDelete
                                className="text-gray-500 text-2xl"
                                onClick={() => {
                                  handleTermDelete(index);
                                }}
                                title="Delete Image"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        push({ term: "", definition: "", image: null })
                      }
                      className="text-blue-800 absolute bottom-1 left-2 cursor-pointer hover:text-blue-700"
                    >
                      + Add more
                    </button>
                  </>
                )}
              </FieldArray>
            </div>
            {/* <div className="button flex justify-center items-center"></div> */}
            <div className="flex justify-center items-center m-4">
              <button
                type="submit"
                className={`bg-red-600 text-white rounded p-1 w-24
                }`}
              >
                Create
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};

export default Createflashcard;
