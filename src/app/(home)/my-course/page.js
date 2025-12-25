import { requireAuth } from "@/lib/auth";
const App = () => {
    requireAuth()

    return <>测试</>;
}
 
export default App;