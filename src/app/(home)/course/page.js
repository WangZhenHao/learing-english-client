import Item from './_components/item'
import { getList } from '@/api/course'
const App = async () => {
    const res = await getList();

    return <Item data={res.data.list} />
}
 
export default App;