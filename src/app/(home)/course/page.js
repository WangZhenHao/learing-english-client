import Item from "./_components/item";
import { getList, getCatergory } from "@/api/server/course";
import CoursePagination from "@/app/_components/CoursePagination";
import Catergory from "./_components/Catergory";
import Empty from "./_components/Empty";

const App = async ({ searchParams, params }) => {
    const { category } = await params;
    const { page = 1 } = await searchParams;
    const { data } = await getList({ page, categoryId: category });
    const { data: categoryList } = await getCatergory();
    // console.log(category)
    return (
        <div className="h-full flex content-between flex-wrap">
            <div className="w-full">
                <Catergory categoryId={category} list={categoryList} />
                <Item route="/course/detail" data={data.list} />
                {data.list.length <= 0 && <Empty />}
            </div>
            <div className="w-full justify-end flex py-2.5">
                <CoursePagination
                    page={data.page.page}
                    totalPages={data.page.totalPage}
                />
            </div>
        </div>
    );
    // return <Item route='/course/detail' data={res.data.list} />
};

export default App;
