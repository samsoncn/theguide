import React from "react"
import Subject from "./sub-components/Subject"
import ChatHistory from "./sub-components/ChatHistory"
import Footer from "./sub-components/Footer"

const Sidebar = () => {
    return <div>Sidebar
        <Subject />
        <ChatHistory/>
        <Footer/>
    </div>
}

export default Sidebar