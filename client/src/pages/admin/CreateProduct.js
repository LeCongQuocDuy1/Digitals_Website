import React, { useCallback, useEffect, useState } from "react";
import InputForm from "../../components/Input/InputForm";
import MarkdownEditor from "../../components/Input/MarkdownEditor";
import SelectForm from "../../components/Select/SelectForm";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { validate, filetoBase64 } from "../../ultils/helpers";
import { apiCreateProduct } from "../../apis/products";

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
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const [hoverElment, setHoverElement] = useState(null);
    const changeValue = useCallback((e) => {
        setPayload(e);
    });

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            if (data?.category)
                data.category = categories?.find(
                    (c) => c._id === data.category
                ).title;
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload))
                formData.append(i[0], i[1]);
            if (finalPayload.thumb)
                formData.append("thumb", finalPayload.thumb[0]);
            if (finalPayload.images) {
                for (let image of finalPayload.images)
                    formData.append("images", image);
            }
            const response = await apiCreateProduct(formData);
            if (response.success) {
                reset();
                setPayload({
                    thumb: "",
                    images: [],
                });
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    };

    const handlePreviewThumb = async (file) => {
        const base64Thumb = await filetoBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    };

    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                toast.warning("File not supported! Please try again.");
                return;
            }
            const base64 = await filetoBase64(file);
            imagesPreview.push({ name: file.name, path: base64 });
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };

    // const handleRemoveImage = (imgName) => {
    //     const files = [...watch("images")];
    //     reset({
    //         images: files?.filter((el) => el.name !== imgName),
    //     });
    //     if (preview.images?.some((el) => el.name === imgName))
    //         setPreview((prev) => ({
    //             ...prev,
    //             images: prev.images?.filter((el) => el.name !== imgName),
    //         }));
    // };

    useEffect(() => {
        handlePreviewThumb(watch("thumb")[0]);
    }, [watch("thumb")]);

    useEffect(() => {
        handlePreviewImages(watch("images"));
    }, [watch("images")]);

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
                        {preview.thumb && (
                            <img
                                src={preview.thumb}
                                alt="thumbnail"
                                className="w-[200px] h-[150px] object-cover"
                            />
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
                        {preview.images?.length > 0 && (
                            <div className="my-4 flex w-full gap-3 flex-wrap">
                                {preview.images?.map((image, index) => (
                                    <div
                                        onMouseEnter={() =>
                                            setHoverElement(image.name)
                                        }
                                        className="w-fit relative"
                                        onMouseLeave={() =>
                                            setHoverElement(null)
                                        }
                                    >
                                        <img
                                            key={index}
                                            src={image.path}
                                            alt="image"
                                            className="w-[200px] h-[150px] object-cover"
                                        />
                                        {/* {hoverElment === image.name && (
                                            <div
                                                className="absolute cursor-pointer inset-0 bg-overplay flex items-center justify-center"
                                                onClick={() =>
                                                    handleRemoveImage(
                                                        image.name
                                                    )
                                                }
                                            >
                                                <icons.FaTrashAlt
                                                    className="text-[#ececec]"
                                                    size={24}
                                                />
                                            </div>
                                        )} */}
                                    </div>
                                ))}
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
