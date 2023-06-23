import React from "react"
import Subject from "./sub-components/Subject"
import ChatHistory from "./sub-components/ChatHistory"
import Footer from "./sub-components/Footer"

const Sidebar = () => {
    return (
        <>
            <div className="w-[20%] h-screen bg-slate-500">
                <div className="">
                    <Subject />
                    <ChatHistory />
                    <Footer />
                </div>
            </div>
        </>
    );


}

export default Sidebar