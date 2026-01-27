import { getRequestConfig } from "next-intl/server";
// import { cookies } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
    // const store = await cookies();
    // const locale = store.get('locale')?.value || 'zh';
    // Static for now, we'll change this later
    let locale = await requestLocale;

    locale = locale || "zh";
    // const locale1 = "en";
    // console.log("locale", locale);
    return {
        locale: locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
