import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { FaFileUpload } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { uploadToCloudinary } from "./Upload/uploadToCloudinary";

const Createflashcard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const termImageRef = useRef([]);
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

  // delete the Image of specific term
  const handleTermDelete = (index) => {
    formik.setFieldValue(`Terms[${index}].image`, null);
  };
  const handleEdit = () => {
    fileInputRef.current?.click();
  };

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
    onSubmit: async (values) => {
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
      navigate("/Myflashcard");
    },
  });

  return (
    <>
      {/* ===================== GROUP DETAILS ===================== */}
      <div className="box mt-4 ml-24 w-3/4 border-2 rounded">
        {/* IMPORTANT:
           Button must be inside <form> to trigger submit */}
        <FormikProvider value={formik}>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="form-div bg-white grid grid-cols-2">
              {/* ---------- Create Group ---------- */}
              <div className="flex flex-col gap-2 ml-4">
                <label className=" text-gray-400">Create Group*</label>
                <input
                  className="border border-gray-300 p-1 rounded"
                  type="text"
                  name="creategroup"
                  onChange={formik.handleChange}
                  value={formik.values.creategroup}
                />
              </div>

              {/* ---------- Group Image Upload ---------- */}

              <div className="flex flex-col gap-2 ml-4 justify-center items-center ">
                {/* Html for should be same as id of the input */}
                {!formik.values.groupImage && (
                  <>
                    <label htmlFor="groupImage">
                      <div className="flex justify-center mt-6 items-center gap-2 border border-gray-300 hover:border-blue-300 rounded w-36 h-8">
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
                  <div className="flex gap-2 justify-center items-center  ">
                    <img
                      src={URL.createObjectURL(formik.values.groupImage)}
                      alt="Group Preview"
                      className="w-auto h-48 mt-3 object-cover rounded border"
                    />
                    {/* <div className="add"></div> */}
                    <FaEdit onClick={handleEdit} title="Upload New" />
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
                  className="w-[40rem] h-28 border border-gray-300 rounded p-2"
                  placeholder="Enter description..."
                />
              </div>
            </div>

            {/* Terms Section */}

            <div className="terms TermMain relative bg-white shadow-md mt-4 w-full border-2 rounded p-4">
              <FieldArray name="Terms">
                {({ push }) => (
                  <>
                    {formik.values.Terms.map((item, index) => (
                      <div key={index} className="flex items-start gap-6">
                        {/* Term */}

                        <div className="flex flex-col">
                          <label className="mb-1 text-gray-400">
                            Enter Term*
                          </label>
                          <input
                            name={`Terms[${index}].term`}
                            value={item.term}
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
                            name={`Terms[${index}].definition`}
                            onChange={formik.handleChange}
                            value={item.definition}
                            className="border border-gray-300 p-2 rounded w-80 h-20 resize-none"
                          />
                        </div>

                        {/* Image Upload */}
                        {!item.image && (
                          <div className="flex flex-col mt-12">
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
                          <div className="flex gap-2 justify-center items-center  ">
                            <img
                              src={URL.createObjectURL(item.image)}
                              alt="Group Preview"
                              className="w-auto h-24 mt-3 object-cover rounded border"
                            />
                            {/* <div className="add"></div> */}
                            <FaEdit
                              onClick={() => {
                                handleTermImage(index);
                              }}
                              title="Upload New"
                            />
                            <MdDelete
                              onClick={() => {
                                handleTermDelete(index);
                              }}
                              title="Delete Image"
                            />
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
                className="bg-red-600 text-white rounded p-1 w-24"
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
