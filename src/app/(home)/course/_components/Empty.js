import { FileQuestionMark } from "lucide-react";

const App = () => {
    return <div className="text-center" style={{marginTop: '200px'}}>
        <div className=" inline-block"><FileQuestionMark size={80} /></div>
        <div className="text-[#666]">暂无数据</div>
    </div>;
}
 
export default App;