import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import InputForm from "../Input/InputForm";
import { filetoBase64 } from "../../ultils/helpers";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiAddVarriant } from "../../apis/products";

const CustomizeVarriants = ({
    customizeVarriants,
    setCustomizeVarriants,
    render,
}) => {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = useForm();

    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });

    const handleAddVarriants = async (data) => {
        if (data.color === customizeVarriants.color)
            Swal.fire("Oops!", "Color not changed", "info");
        else {
            const formData = new FormData();
            for (let i of Object.entries(data)) formData.append(i[0], i[1]);
            if (data.thumb) formData.append("thumb", data.thumb[0]);
            if (data.images) {
                for (let image of data.images) formData.append("images", image);
            }
            const response = await apiAddVarriant(
                formData,
                customizeVarriants._id
            );
            if (response.status) {
                reset();
                setPreview({
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

    useEffect(() => {
        handlePreviewThumb(watch("thumb")[0]);
    }, [watch("thumb")]);

    useEffect(() => {
        handlePreviewImages(watch("images"));
    }, [watch("images")]);

    useEffect(() => {
        reset({
            title: customizeVarriants?.title,
            price: customizeVarriants?.price,
            color: customizeVarriants?.color,
        });
    }, [customizeVarriants]);

    return (
        <div className="bg-white p-5 relative">
            <ToastContainer />
            <h1 className="text-[28px] font-bold">CustomizeVarriants</h1>
            <div className="mt-[50px]">
                <form onSubmit={handleSubmit(handleAddVarriants)}>
                    <InputForm
                        label="Original Name"
                        register={register}
                        errors={errors}
                        id="title"
                        validate={{
                            required: "Name is required!",
                        }}
                        placeholder="Name of product"
                    />
                    <div className="flex gap-4 items-center w-full my-[10px]">
                        <InputForm
                            label="Price"
                            register={register}
                            errors={errors}
                            id="price"
                            validate={{
                                required: "Price is required!",
                            }}
                            placeholder="Price of product"
                            type="number"
                        />
                        <InputForm
                            label="Color"
                            register={register}
                            errors={errors}
                            id="color"
                            validate={{
                                required: "Color is required!",
                            }}
                            placeholder="Color of product"
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
                                    <div className="w-fit relative">
                                        <img
                                            key={index}
                                            src={image.path}
                                            alt="image"
                                            className="w-[200px] h-[150px] object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="w-full mt-[20px]">
                        <Button type="submit" value="Add Varriants" wf={true} />
                    </div>
                    <div className="w-full mt-[20px]">
                        <Button
                            handleOnClick={() => setCustomizeVarriants(null)}
                            type="button"
                            value="Cancer"
                            wf={true}
                            cancel={true}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomizeVarriants;
