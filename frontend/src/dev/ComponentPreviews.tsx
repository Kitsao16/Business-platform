// Adjusting ComponentPreviews.tsx to lazy-load the Login component
import React, { Suspense, lazy } from "react";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

// Lazy-load the Login component
const Login = lazy(() => import("../components/Auth/Login"));

const ComponentPreviews = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Previews palette={<PaletteTree />}>
                <ComponentPreview path="/Login">
                    <Login />
                </ComponentPreview>
                {/* Add more ComponentPreview entries as needed */}
            </Previews>
        </Suspense>
    );
}

export default ComponentPreviews;