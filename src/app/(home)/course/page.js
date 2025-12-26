import Item from './_components/item'
import { getList } from '@/api/server/course'
const App = async () => {
    const res = await getList();

    return <Item route='/course/detail' data={res.data.list} />
}
 
export default App;