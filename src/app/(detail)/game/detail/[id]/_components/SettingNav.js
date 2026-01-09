const App = ({ title = "" }) => {
    return (
        <div className="flex items-center p-2.5" style={{ height: "64px" }}>
            <div dangerouslySetInnerHTML={{ __html: title }}></div>
            <div></div>
        </div>
    );
};

export default App;
