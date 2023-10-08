import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MarkdownEditor = ({
    label,
    value,
    changeValue,
    name,
    invalidFields,
    setInvalidFields,
}) => {
    return (
        <div className="my-[10px]">
            <span>{label}</span>
            <Editor
                apiKey="i8th42xamqdm46gjkb5kf5eryrgskm17xui3zlka40lz4i5z"
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onChange={(e) =>
                    changeValue((prev) => ({
                        ...prev,
                        [name]: e.target.getContent(),
                    }))
                }
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some((el) => el.name === name) && (
                <div className="text-error text-[10px] mt-[5px]">
                    {invalidFields?.find((el) => el.name === name)?.message}
                </div>
            )}
        </div>
    );
};

export default memo(MarkdownEditor);
