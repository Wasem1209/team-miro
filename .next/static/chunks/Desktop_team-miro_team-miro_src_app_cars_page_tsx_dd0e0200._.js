(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SoftReservePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/team-miro/team-miro/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/team-miro/team-miro/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/team-miro/team-miro/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/Desktop/team-miro/team-miro/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SoftReservePage() {
    _s();
    const [cars, setCars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch paginated cars from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SoftReservePage.useEffect": ()=>{
            const fetchCars = {
                "SoftReservePage.useEffect.fetchCars": async ()=>{
                    setLoading(true);
                    setError(null);
                    try {
                        const res = await fetch("/api/cars?model=huracan&page=".concat(page, "&limit=9"), {
                            cache: "no-store"
                        });
                        if (!res.ok) throw new Error("Failed to fetch cars");
                        const data = await res.json();
                        setCars(data.cars);
                        setTotalPages(data.totalPages || 1);
                    } catch (err) {
                        if (err instanceof Error) {
                            setError(err.message);
                        } else {
                            setError("An unknown error occurred");
                        }
                    } finally{
                        setLoading(false);
                    }
                }
            }["SoftReservePage.useEffect.fetchCars"];
            fetchCars();
        }
    }["SoftReservePage.useEffect"], [
        page
    ]);
    const handlePageChange = (newPage)=>{
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 px-4 md:px-10 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-left mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-gray-800",
                    children: [
                        "Lamborghini Huracán",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-500",
                            children: [
                                "(",
                                cars.length,
                                " cars found)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-3 mb-8",
                children: [
                    "Lamborghini",
                    "Huracán",
                    "Exotic",
                    "2022",
                    "$1200-1500",
                    "Mon, Nov 3rd, 2025"
                ].map((filter, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-4 py-2 bg-white text-gray-700 text-sm rounded-md shadow-sm border hover:bg-gray-100 transition",
                        children: filter
                    }, i, false, {
                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center py-20 text-gray-600 text-lg",
                children: "Loading cars..."
            }, void 0, false, {
                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center py-20 text-red-600 text-lg",
                children: [
                    "Error: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this),
            !loading && !error && cars.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-gray-500 py-20",
                children: "No cars available."
            }, void 0, false, {
                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this),
            !loading && !error && cars.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                children: cars.map((car)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: car.image,
                                        alt: car.name,
                                        width: 400,
                                        height: 250,
                                        className: "w-full h-56 object-contain p-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full text-white ".concat(car.available ? "bg-green-500" : "bg-red-500"),
                                        children: car.available ? "Available" : "Unavailable"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "w-4 h-4 text-gray-600",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 pb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-800 mt-2",
                                        children: car.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 font-medium",
                                        children: [
                                            "$",
                                            car.price,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-normal text-gray-500",
                                                children: "per day"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-start text-gray-500 text-sm mt-2 space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    car.seats,
                                                    " seats"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 19
                                            }, this),
                                            "•",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: car.transmission
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 50
                                            }, this),
                                            "•",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: car.category
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: !car.available,
                                        className: "w-full mt-4 text-sm font-medium py-2.5 rounded-md transition ".concat(car.available ? "bg-black text-white hover:bg-gray-900" : "bg-gray-200 text-gray-500 cursor-not-allowed"),
                                        children: car.available ? "Reserve Now" : "Unavailable"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this)
                        ]
                    }, car.id, true, {
                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this),
            !loading && totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center items-center gap-2 mt-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handlePageChange(page - 1),
                        className: "px-3 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50",
                        disabled: page === 1,
                        children: "‹"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    Array.from({
                        length: totalPages
                    }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handlePageChange(i + 1),
                            className: "px-3 py-2 border rounded-md ".concat(page === i + 1 ? "bg-black text-white" : "bg-white hover:bg-gray-100"),
                            children: i + 1
                        }, i, false, {
                            fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$team$2d$miro$2f$team$2d$miro$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handlePageChange(page + 1),
                        className: "px-3 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50",
                        disabled: page === totalPages,
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/team-miro/team-miro/src/app/cars/page.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(SoftReservePage, "/AxtuW1R1tMjYet+YLhdBCKcnQs=");
_c = SoftReservePage;
var _c;
__turbopack_context__.k.register(_c, "SoftReservePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_team-miro_team-miro_src_app_cars_page_tsx_dd0e0200._.js.map