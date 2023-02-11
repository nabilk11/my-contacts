import Navbar from "./Navbar"

const Body = ({ children }) => {
return (
    <div className="app">
        <Navbar />
        <div className="container">
            { children }
        </div>
    </div>
)

}

export default Body