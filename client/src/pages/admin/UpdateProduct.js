import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../../components/Input/InputForm";
import MarkdownEditor from "../../components/Input/MarkdownEditor";
import SelectForm from "../../components/Select/SelectForm";
import Button from "../../components/Button/Button";
import { filetoBase64, validate } from "../../ultils/helpers";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { apiUpdateProduct } from "../../apis/products";

const UpdateProduct = ({ editProduct, setEditProduct, render }) => {
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

    const changeValue = useCallback((e) => {
        setPayload(e);
    });

    const handlePreviewThumb = async (file) => {
        const base64Thumb = await filetoBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    };

    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            if (
                file.type !== "image/png" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/jpg"
            ) {
                toast.warning("File not supported! Please try again.");
                return;
            }
            const base64 = await filetoBase64(file);
            imagesPreview.push(base64);
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };

    const handleUpdateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            if (data?.category)
                data.category = categories?.find(
                    (c) => c.title === data.category
                )?.title;
            const finalPayload = { ...data, ...payload };
            finalPayload.thumb =
                data?.thumb?.length === 0 ? preview.thumb : data.thumb[0];
            const formData = new FormData();
            for (let i of Object.entries(finalPayload))
                formData.append(i[0], i[1]);
            finalPayload.images =
                data?.images?.length === 0 ? preview.images : data.images;
            for (let image of finalPayload.images)
                formData.append("images", image);
            const response = await apiUpdateProduct(formData, editProduct._id);
            if (response.success) {
                render();
                setEditProduct(null);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        }
    };

    useEffect(() => {
        if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
            handlePreviewThumb(watch("thumb")[0]);
        }
    }, [watch("thumb")]);
    useEffect(() => {
        if (watch("images") instanceof FileList && watch("images").length > 0) {
            handlePreviewImages(watch("images"));
        }
    }, [watch("images")]);

    useEffect(() => {
        reset({
            title: editProduct?.title || "",
            price: editProduct?.price || "",
            quantity: editProduct?.quantity || "",
            color: editProduct?.color || "",
            category: editProduct?.category || "",
            brand: editProduct?.brand.toLowerCase() || "",
        });
        setPayload({
            description:
                typeof editProduct?.description === "object"
                    ? editProduct?.description?.join(", ")
                    : editProduct?.description,
        });
        setPreview({
            thumb: editProduct?.thumb || "",
            images: editProduct?.images || [],
        });
    }, [editProduct]);

    return (
        <div className="">
            <ToastContainer />
            <h1 className="text-[28px] font-bold">Update Products</h1>
            <div className="mt-[50px]">
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                        value={payload.description}
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
                                code: category.title,
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
                                        category.title === watch("category")
                                )
                                ?.brand?.map((brandEl) => ({
                                    code: brandEl.toLowerCase(),
                                    value: brandEl,
                                }))}
                        />
                    </div>
                    <div className="my-[10px]">
                        <label htmlFor="thumb" className="block my-[5px]">
                            Thumbnail
                        </label>
                        <input type="file" id="thumb" {...register("thumb")} />
                        {errors["thumb"] && (
                            <div className="w-full text-error text-[10px]">
                                {`${errors["thumb"]?.message}`}
                            </div>
                        )}
                        {preview?.thumb && (
                            <img
                                src={preview?.thumb}
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
                            {...register("images")}
                            multiple
                        />
                        {errors["images"] && (
                            <div className="w-full text-error text-[10px]">
                                {`${errors["images"]?.message}`}
                            </div>
                        )}
                        {preview?.images?.length > 0 && (
                            <div className="my-4 flex w-full gap-3 flex-wrap">
                                {preview?.images?.map((image, index) => (
                                    <div className="w-fit relative" key={index}>
                                        <img
                                            src={image}
                                            alt="image"
                                            className="w-[200px] h-[150px] object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-full mt-[20px]">
                        <Button type="submit" value="Update" wf={true} />
                    </div>
                    <div className="w-full mt-[20px]">
                        <Button
                            handleOnClick={() => setEditProduct(null)}
                            type="button"
                            value="Back"
                            wf={true}
                            cancel={true}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(UpdateProduct);
