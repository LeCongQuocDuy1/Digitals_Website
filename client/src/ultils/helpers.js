import icons from "../ultils/icons";

const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) => {
    return string
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-");
};

export const formatMoney = (number) =>
    Number(number?.toFixed(1)).toLocaleString();

export const renderRatings = (number) => {
    // 4 => [fill, fill, fill, fill, out]
    // 2 => [fill, fill, out, out, out]
    if (!Number(number)) return;
    const stars = [];

    for (let i = 0; i < +number; i++) {
        stars.push(
            <AiFillStar
                key={i}
                className="text-[15px] text-yellow-500 mb-[3px]"
            />
        );
    }
    for (let i = 5; i > +number; i--) {
        stars.push(
            <AiOutlineStar
                key={i}
                className="text-[15px] text-yellow-500 mb-[3px]"
            />
        );
    }
    return stars;
};

export const secondsToHms = (d) => {
    d = Number(d) / 1000;
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    return { h, m, s };
};

export const validate = (payload, setInvalidFields) => {
    let invalid = 0;
    const formatPayload = Object.entries(payload);
    for (let arr of formatPayload) {
        if (arr[1].trim() === "") {
            invalid++;
            setInvalidFields((prev) => [
                ...prev,
                {
                    name: arr[0],
                    message: "Require this field",
                },
            ]);
        }
    }

    // for (let arr of formatPayload) {
    //     switch (arr[0]) {
    //         case "email":
    //             const regex =
    //                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //             if (!arr[1].toLowerCase().match(regex)) {
    //                 invalid++;
    //                 setInvalidFields((prev) => [
    //                     ...prev,
    //                     {
    //                         name: arr[0],
    //                         message:
    //                             "Email invalid! Please enter a valid email",
    //                     },
    //                 ]);
    //             }
    //             break;
    //         case "password":
    //             if (arr[1].length < 6) {
    //                 invalid++;
    //                 setInvalidFields((prev) => [
    //                     ...prev,
    //                     {
    //                         name: arr[0],
    //                         message: "Password must be at least 6 characters!",
    //                     },
    //                 ]);
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }

    return invalid;
};

export const generateRange = (start, end) => {
    const length = end + 1 - start;
    return Array.from({ length }, (_, index) => start + index);
};

export const filetoBase64 = (file) => {
    if (!file) return "";
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
