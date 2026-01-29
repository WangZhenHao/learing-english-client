// const Privacy = () => {
//     return <>
    
//     </>;
// }
 
// export default Privacy;
// app/privacy-policy/page.tsx
export default function Privacy() {
    return (
        <main className="px-4 py-10 text-[#333]" style={{margin: "0 auto", maxWidth: "1200px"}}>
        <h1 className="mb-6 text-3xl font-bold text-center">
          隐私政策
        </h1>
  
        <p className="mb-8 text-sm text-gray-500 text-center">
          更新日期：2026 年 1 月 29 日 · 生效日期：2026 年 1 月 29 日
        </p>
  
        <section className="space-y-6 text-base leading-7">
          <p>
            欢迎使用 <strong>【影跟读】</strong>（以下简称“本平台”）。
            我们非常重视用户的个人信息与隐私保护。
            本隐私政策将向您说明我们如何收集、使用、存储、共享及保护您的个人信息，
            以及您所享有的相关权利。
          </p>
  
          <p>
            在您使用本平台前，请您仔细阅读并充分理解本隐私政策。
            <strong>
              一旦您开始使用或继续使用本平台，即表示您已同意本隐私政策的全部内容。
            </strong>
          </p>
  
          {/* 一、信息收集 */}
          <h2 className="text-xl font-semibold">一、我们收集的信息</h2>
  
          <h3 className="font-medium">1. 您主动提供的信息</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>注册信息：如用户名（如有）、邮箱、手机号（如有）</li>
            <li>学习相关信息：学习记录、收藏内容、练习进度</li>
            <li>您在反馈或客服沟通中提供的信息</li>
          </ul>
  
          <h3 className="font-medium">2. 自动收集的信息</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>设备信息：设备型号、操作系统、浏览器类型</li>
            <li>日志信息：IP 地址、访问时间、页面浏览记录</li>
            <li>使用行为信息：点击、学习时长、功能使用频率</li>
          </ul>
  
          <h3 className="font-medium">3. 音频与语音数据（如适用）</h3>
          <p>
            当您使用跟读、口语练习等功能时，
            我们可能会收集您上传的语音数据，
            仅用于学习功能实现、评估与服务优化。
          </p>
  
          {/* 二、信息使用 */}
          <h2 className="text-xl font-semibold">二、我们如何使用您的信息</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>为您提供注册、登录与学习服务</li>
            <li>保存学习进度，提供个性化学习体验</li>
            <li>优化产品功能与用户体验</li>
            <li>向您发送与服务相关的通知</li>
            <li>进行统计分析（以匿名或去标识化方式）</li>
          </ul>
          <p>
            我们不会将您的个人信息用于与本平台服务无关的用途。
          </p>
  
          {/* 三、信息存储与保护 */}
          <h2 className="text-xl font-semibold">三、信息的存储与保护</h2>
          <p>
            我们会在符合法律法规要求的前提下，
            将您的个人信息存储于安全的服务器中，
            并采取合理的技术和管理措施（如加密、访问控制）
            防止信息被泄露、篡改或丢失。
          </p>
          <p>
            我们仅在实现本隐私政策所述目的所需的最短期限内保留您的个人信息，
            法律法规另有规定的除外。
          </p>
  
          {/* 四、信息共享 */}
          <h2 className="text-xl font-semibold">四、信息的共享、转让与披露</h2>
          <p>
            我们承诺不会出售您的个人信息。
          </p>
          <p>仅在以下情况下，可能会共享您的信息：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              为实现功能所必需的第三方服务（如云存储、数据统计、支付服务）
            </li>
            <li>根据法律法规或司法机关的要求</li>
            <li>取得您明确同意的其他情形</li>
          </ul>
  
          {/* 五、用户权利 */}
          <h2 className="text-xl font-semibold">五、您的权利</h2>
          <p>您有权：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>查询、更正或补充您的个人信息</li>
            <li>删除您的个人信息（法律法规另有规定的除外）</li>
            <li>申请注销账号</li>
            <li>撤回已同意的授权</li>
          </ul>
          <p>
            您可通过平台提供的方式或联系客服行使上述权利。
          </p>
  
          {/* 六、未成年人 */}
          <h2 className="text-xl font-semibold">六、未成年人保护</h2>
          <p>
            如您未满 <strong>14 周岁</strong>，
            请在监护人同意和指导下使用本平台。
            我们不会在明知的情况下主动收集未成年人的个人信息。
          </p>
  
          {/* 七、政策变更 */}
          <h2 className="text-xl font-semibold">七、隐私政策的变更</h2>
          <p>
            我们可能会适时更新本隐私政策。
            若变更内容对用户权益产生重大影响，
            将通过平台公告或显著方式通知您。
          </p>
  
          {/* 八、联系我们 */}
          <h2 className="text-xl font-semibold">八、联系我们</h2>
          <p>如您对本隐私政策有任何疑问，可联系我们：</p>
          <ul className="list-disc pl-6 space-y-2">
          <li>联系邮箱：<strong>【1471047476@qq.com】</strong></li>
          <li>网站地址：<strong>【https://www.jikenext.com】</strong></li>
          </ul>
        </section>
      </main>
    );
  }
  