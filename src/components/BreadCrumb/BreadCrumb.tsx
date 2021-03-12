import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./BreadCrumb.css"


const BreadCrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((item: any) => item);
    return (
        <div>
            <Breadcrumb >
                {pathnames.length > 0 ? (
                    <Breadcrumb.Item>
                        <Link to="/">Dashboard</Link>
                    </Breadcrumb.Item>
                ) : (
                        <Breadcrumb.Item>
                            Home
                        </Breadcrumb.Item>
                    )}
                {pathnames.map((name: any, index: any) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Breadcrumb.Item>{name}</Breadcrumb.Item>
                    ) : (
                            <Breadcrumb.Item >
                                <Link to={`${routeTo}`}>{name}</Link>
                            </Breadcrumb.Item>
                        );
                })}
            </Breadcrumb>
        </div>
    );
}

export default BreadCrumb;