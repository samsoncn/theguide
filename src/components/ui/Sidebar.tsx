import React from "react"
import Subject from "./sub-components/Subject"
import ChatHistory from "./sub-components/ChatHistory"
import Footer from "./sub-components/Footer"

const Sidebar = () => {
    return (
        <>
            <div className="w-[20%] h-screen bg-slate-500">
                <h1 className="text-4xl font-extrabold text-center py-10 underline text-slate-800">TheGuides</h1>
                    <Subject />
                    <ChatHistory />
                    <Footer />
            </div>
        </>
    );


}

export default Sidebar