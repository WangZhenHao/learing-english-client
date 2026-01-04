import { Spinner } from "@/components/ui/spinner"
const App = () => {
    return <div className="h-screen flex items-center justify-center">
        <div className="flex items-center justify-center"><Spinner /> <div className="pl-1">加载中...</div></div>
    </div>;
}
 
export default App;