const paths = {
    PUBLIC: "/",
    HOME: "",
    ALL: "*",
    LOGIN: "login",
    PRODUCTS: ":category",
    BLOGS: "blogs",
    ABOUT_US: "about",
    OUR_SERVICES: "services",
    FAQS: "faqs",
    CONTACT_US: "contact",
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
    DETAIL_PRODUCT: "product",
    FINAL_REGISTER: "finalregister/:status",
    RESET_PASSWORD: "reset-password/:token",

    // ADMIN
    ADMIN: "admin",
    DASHBOARD: "dashboard",
    CREATE_PRODUCT: "create-product",
    MANAGE_USER: "manage-user",
    MANAGE_PRODUCT: "manage-product",
    MANAGE_ORDER: "manage-order",

    // MEMBER
    MEMBER: "member",
    PERSONAL: "personal",
};

export default paths;
