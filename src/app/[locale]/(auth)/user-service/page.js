// const UserService = () => {
//     return <>
    
//     </>;
// }
 
// export default UserService;
// app/user-agreement/page.tsx
export default function UserService() {
    return (
      <main className="px-4 py-10 text-[#333]" style={{margin: "0 auto", maxWidth: "1200px"}}>
        <h1 className="mb-6 text-3xl font-bold text-center">
          用户服务协议
        </h1>
  
        <p className="mb-8 text-sm text-gray-500 text-center">
          更新日期：2026 年 1 月 29 日 <br /> 生效日期：2026 年 1 月 29 日
        </p>
  
        <section className="space-y-6 text-base leading-7">
          <p>
            欢迎使用 <strong>【影跟读】</strong>（以下简称“本平台”）。
            本《用户服务协议》（以下简称“本协议”）是您与本平台运营方之间，
            就使用本平台服务所订立的协议。
          </p>
  
          <p>
            在您注册、登录或使用本平台服务前，请您仔细阅读并充分理解本协议内容。
            <strong>
              一旦您开始使用本平台，即视为您已同意并接受本协议的全部条款。
            </strong>
          </p>
  
          {/* 一、服务内容 */}
          <h2 className="text-xl font-semibold">一、服务内容</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>外语学习内容浏览与学习</li>
            <li>跟读、口语练习等学习功能</li>
            <li>学习记录、学习进度管理</li>
            <li>与外语学习相关的其他服务</li>
          </ul>
          <p>
            本平台有权根据实际情况对服务内容进行调整、升级或暂停，
            并将以合理方式通知用户。
          </p>
  
          {/* 二、用户注册与账号管理 */}
          <h2 className="text-xl font-semibold">二、用户注册与账号管理</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>用户应提供真实、准确、完整的注册信息</li>
            <li>账号仅限本人使用，不得转让、出租或出借</li>
            <li>因账号保管不善造成的损失由用户自行承担</li>
            <li>发现账号异常应及时联系平台</li>
          </ul>
  
          {/* 三、用户行为规范 */}
          <h2 className="text-xl font-semibold">三、用户行为规范</h2>
          <p>用户在使用本平台过程中，不得从事以下行为：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>违反法律法规或社会公序良俗的行为</li>
            <li>发布违法、有害、侵权或不当内容</li>
            <li>恶意攻击、干扰平台系统或爬取数据</li>
            <li>未经许可复制、传播或商业使用平台内容</li>
          </ul>
          <p>
            如用户违反上述规定，本平台有权视情况采取警告、
            限制功能、暂停或终止服务等措施。
          </p>
  
          {/* 四、知识产权 */}
          <h2 className="text-xl font-semibold">四、内容与知识产权</h2>
          <p>
            本平台所提供的文字、音频、视频、课程内容及页面设计等，
            均依法受到知识产权保护。
          </p>
          <p>
            用户在平台上传或生成的内容（如跟读音频），
            视为用户合法拥有相应权利，
            同时授权平台在提供和优化服务的范围内合理使用。
          </p>
  
          {/* 五、付费服务 */}
          <h2 className="text-xl font-semibold">五、付费服务（如适用）</h2>
          <p>
            本平台部分服务可能以付费方式提供，具体内容、
            价格及规则以页面展示为准。
          </p>
          <p>
            已完成的付费服务，除法律法规另有规定外，
            不支持无理由退款。
          </p>
  
          {/* 六、免责声明 */}
          <h2 className="text-xl font-semibold">六、服务中断与免责声明</h2>
          <p>
            本平台将尽力保障服务稳定运行，但因系统维护、
            网络故障、不可抗力等原因造成的服务中断，
            本平台不承担由此产生的责任。
          </p>
          <p>
            本平台提供的学习内容仅作为学习辅助，
            不构成任何形式的学习结果保证。
          </p>
  
          {/* 七、协议变更 */}
          <h2 className="text-xl font-semibold">七、协议的变更与终止</h2>
          <p>
            本平台有权根据业务发展需要对本协议进行修改。
            若修改内容对用户权益产生重大影响，
            将以公告或显著方式通知用户。
          </p>
  
          {/* 八、账号注销 */}
          <h2 className="text-xl font-semibold">八、账号注销</h2>
          <p>
            用户可按照平台指引申请注销账号。
            注销后相关数据将依据《隐私政策》进行处理。
          </p>
  
          {/* 九、法律适用 */}
          <h2 className="text-xl font-semibold">九、适用法律与争议解决</h2>
          <p>
            本协议的订立、执行与解释均适用中华人民共和国法律。
            因本协议产生的争议，应协商解决；
            协商不成的，提交有管辖权的人民法院处理。
          </p>
  
          {/* 十、联系我们 */}
          <h2 className="text-xl font-semibold">十、联系我们</h2>
          <p>
            如您对本协议有任何疑问，请联系我们：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>联系邮箱：<strong>【1471047476@qq.com】</strong></li>
            <li>网站地址：<strong>【https://www.jikenext.com】</strong></li>
          </ul>
        </section>
      </main>
    );
  }
  