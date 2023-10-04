import React from "react";

const FeaturedGallery = () => {
    return (
        <div className="grid grid-cols-4 gap-[20px] h-[650px]">
            <div className="h-full col-span-2">
                <a href="/" className="">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
                        alt=""
                        className="w-full h-full object-cover outline-none"
                    />
                </a>
            </div>
            <div className="h-full grid gap-[20px] grid-rows-2">
                <div className="h-full">
                    <a href="/" className="">
                        <img
                            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                            alt=""
                            className="w-full h-full object-cover outline-none"
                        />
                    </a>
                </div>
                <div className="h-full">
                    <a href="/" className="">
                        <img
                            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                            alt=""
                            className="w-full h-full object-cover outline-none"
                        />
                    </a>
                </div>
            </div>
            <div className="h-full">
                <a href="/" className="">
                    <img
                        src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
                        alt=""
                        className="w-full h-full object-cover outline-none"
                    />
                </a>
            </div>
        </div>
    );
};

export default FeaturedGallery;
