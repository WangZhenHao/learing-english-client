import { getUserArticles } from "@/api/server/course";
import Item from "../course/_components/item";
import Empty from "../course/_components/Empty";
import CoursePagination from "@/app/_components/CoursePagination";
const App = async ({ searchParams }) => {
    const { page = 1 } = await searchParams;
    // console.log(searchParams.page, '-----------------------------')
    const { data } = await getUserArticles({ page });
    return (
        <div className="relative h-full">
            {data.list.length > 0 ? (
                <>
                    <Item route="/my-course/detail" data={data.list} />
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
            ) : (
                <Empty />
            )}
            {/* <Item route="/my-course/detail" data={data.list} />
            <div className="absolute bottom-0 right-0" style={{zIndex: 2}}>
                <CoursePagination
                    page={data.page.page}
                    totalPages={data.page.totalPage}
                />
            </div> */}
        </div>
    );
};

export default App;
