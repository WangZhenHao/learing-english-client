import Item from './_components/item'
import { getList } from '@/api/server/course'
import CoursePagination from "@/app/_components/CoursePagination";

const App = async ({searchParams}) => {
    const { page = 1 } = await searchParams;
    const { data } = await getList({page});
    return (
        <div className="relative h-full">
            <Item route="/course/detail" data={data.list} />
            <div className="absolute bottom-0 right-0" style={{zIndex: 2}}>
                <CoursePagination
                    page={data.page.page}
                    totalPages={data.page.totalPage}
                />
            </div>
        </div>
    );
    // return <Item route='/course/detail' data={res.data.list} />
}
 
export default App;