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
