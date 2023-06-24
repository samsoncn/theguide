import React from "react"
import Subject from "./sub-components/Subject"
import ChatHistory from "./sub-components/ChatHistory"
import Footer from "./sub-components/Footer"

const Sidebar = () => {
    return (
        <>
            <div className="w-[20%] h-screen bg-slate-500">
                <h1 className="text-4xl font-extrabold text-center py-10 underline text-slate-800">TheGuides</h1>

                <div className="mx-5 rounded-xl h-[75%]">
                    {/* <div className="container mx-auto rounded-xl h-[8%] bg-[#d4d4d4] sm:px-4 flex justify-evenly items-center">
                        <div>
                            <input type="radio" name="option" id="1" className="peer hidden" checked />
                            <label className="block cursor-pointer select-none rounded-xl text-center peer-checked:bg-[#858585] peer-checked:font-bold peer-checked:text-white">
                                <Subject />
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="2" className="peer hidden" />
                            <label className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#858585] peer-checked:font-bold peer-checked:text-white">
                                <ChatHistory />
                            </label>
                        </div> */}
                    <div
                        className="grid grid-cols-2 space-x-2 rounded-xl bg-gray-200 p-2"
                        x-data="app"
                    >
                        <div>
                            <input type="radio" name="option" id="1" className="peer hidden" checked />
                            <label
                                htmlFor="1"
                                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#858585] peer-checked:font-bold peer-checked:text-white"
                            ><Subject /></label>
                        </div>
                        <div>
                            <input type="radio" name="option" id="2" className="peer hidden" />
                            <label
                                htmlFor="2"
                                className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#858585] peer-checked:font-bold peer-checked:text-white"
                            ><ChatHistory /></label>
                        </div>
                    </div>
                    <div className="border-2 h-[90%]">

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );


}

export default Sidebar