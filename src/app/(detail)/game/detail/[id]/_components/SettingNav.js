const App = ({ title = "", score }) => {
    return (
        <div className="flex items-center p-2.5 border-b border-border justify-between" style={{ height: "64px" }}>
            <div className="font-bold" dangerouslySetInnerHTML={{ __html: title }}></div>
            <div className="pl-2.5">总分100分, 共{score.totalCount}填空,每个填空{score.perScore}分</div>
        </div>
    );
};

export default App;
