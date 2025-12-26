import { getUserArticles } from '@/api/server/course'
import Item from '../course/_components/item'
const App = async () => {
    const res = await getUserArticles();
    return <Item route='/my-course/detail' data={res.data.list} />;
}
 
export default App;