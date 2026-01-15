const BottomFooter = () => {
    return (
        <footer className=" section-wrap text-white py-4 footer-wrap">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold">关于我们</h3>
                        <p className="mt-2 max-w-md">
                            致力于为您提供优质的英语学习体验，帮助您提升语言技能，实现个人目标。
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end">
                        <h3 className="text-[18px] font-semibold mb-2">联系我们</h3>
                        <div >
                            <p>邮箱: 1471047476@qq.com</p>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-6 pt-6 text-center text-[#999]">
                    <p>&copy; {new Date().getFullYear()} 英语学习平台. 保留所有权利.</p>
                </div>
            </div>
        </footer>
    );
}

export default BottomFooter;