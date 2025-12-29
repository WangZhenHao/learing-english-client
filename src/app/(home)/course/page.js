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
        <div className="relative h-full">
            <Catergory categoryId={category} list={categoryList} />
            {data.list.length > 0 ? (
                <>
                    <Item route="/course/detail" data={data.list} />
                    <div
                        className="absolute bottom-0 right-0"
                        style={{ zIndex: 2 }}
                    >
                        <CoursePagination
                            page={data.page.page}
                            totalPages={data.page.totalPage}
                        />
                    </div>
                </>
            ) : <Empty />}
        </div>
    );
    // return <Item route='/course/detail' data={res.data.list} />
};

export default App;
