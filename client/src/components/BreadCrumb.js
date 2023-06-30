import React from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const BreadCrumb = ({ title, category }) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ];

    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className="header-contact bg-[#f7f7f7] mb-[20px]">
            <div className="title-top  w-main m-auto  py-[15px]">
                <h3 className="uppercase mb-[10px] text-[#151515] font-semibold text-[18px]">
                    {title}
                </h3>
                <span className="flex gap-[5px] text-[14px]">
                    {breadcrumbs
                        ?.filter((el) => !el.match.route === false)
                        .map(({ match, breadcrumb }, index, self) => (
                            <React.Fragment key={index}>
                                <Link
                                    key={index}
                                    to={match.pathname}
                                    className="hover:text-main"
                                >
                                    {breadcrumb}
                                </Link>
                                {index !== self.length - 1 && (
                                    <icons.MdOutlineNavigateNext className="flex self-center" />
                                )}
                            </React.Fragment>
                        ))}
                </span>
            </div>
        </div>
    );
};

export default BreadCrumb;
