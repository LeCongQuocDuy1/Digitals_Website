import React, { useCallback, useState } from "react";
import InputForm from "../../components/Input/InputForm";
import MarkdownEditor from "../../components/Input/MarkdownEditor";
import SelectForm from "../../components/Select/SelectForm";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { validate } from "../../ultils/helpers";

const CreateProduct = () => {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = useForm();
    const { categories } = useSelector((state) => state.app);
    const [payload, setPayload] = useState({
        description: "",
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const changeValue = useCallback((e) => {
        setPayload(e);
    });

    const handleCreateProduct = (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            if (data?.category)
                data.category = categories?.find(
                    (c) => c._id === data.category
                ).title;
            const finalPayload = { ...data, ...payload };
            console.log(finalPayload);
        }
    };

    return (
        <div className="bg-white h-screen p-5">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            <h1 className="text-[28px] font-bold">Create New Product</h1>

            <div className="mt-[50px]">
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputForm
                        label="Name"
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{
                            required: "Name is required!",
                        }}
                        placeholder="Name of new product"
                    />
                    <MarkdownEditor
                        name="description"
                        changeValue={changeValue}
                        label="Description"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className="w-full grid grid-cols-3 gap-4 my-[5px]">
                        <InputForm
                            label="Price"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: "Price is required!",
                            }}
                            type="number"
                            placeholder="Price of new product"
                        />
                        <InputForm
                            label="Quantity"
                            register={register}
                            errors={errors}
                            id="quantity"
                            validate={{
                                required: "Quantity is required!",
                            }}
                            type="number"
                            placeholder="Quantity of new product"
                        />
                        <InputForm
                            label="Color"
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{
                                required: "Color is required!",
                            }}
                            placeholder="Color of new product"
                        />
                    </div>
                    <div className="w-full grid grid-cols-2 gap-4 my-[5px]">
                        <SelectForm
                            label="Category"
                            register={register}
                            errors={errors}
                            id={"category"}
                            validate={{
                                required: "Category is required!",
                            }}
                            options={categories?.map((category) => ({
                                code: category._id,
                                value: category.title,
                            }))}
                        />
                        <SelectForm
                            label="Brand"
                            register={register}
                            errors={errors}
                            id={"brand"}
                            validate={{
                                required: "Brand is required!",
                            }}
                            options={categories
                                ?.find(
                                    (category) =>
                                        category._id === watch("category")
                                )
                                ?.brand?.map((brandEl) => ({
                                    code: brandEl,
                                    value: brandEl,
                                }))}
                        />
                    </div>
                    <div className="my-[10px]">
                        <label htmlFor="thumb" className="block my-[5px]">
                            Thumbnail
                        </label>
                        <input
                            type="file"
                            id="thumb"
                            {...register("thumb", {
                                required: "Thumbnail is required!",
                            })}
                        />
                        {errors["thumb"] && (
                            <div className="w-full text-error text-[10px]">
                                {`${errors["thumb"]?.message}`}
                            </div>
                        )}
                    </div>
                    <div className="my-[10px]">
                        <label htmlFor="images" className="block my-[5px]">
                            Images of product
                        </label>
                        <input
                            type="file"
                            id="images"
                            {...register("images", {
                                required: "Images is required!",
                            })}
                            multiple
                        />
                        {errors["images"] && (
                            <div className="w-full text-error text-[10px]">
                                {`${errors["images"]?.message}`}
                            </div>
                        )}
                    </div>
                    <div className="w-full mt-[20px]">
                        <Button type="submit" value="Create" wf={true} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
