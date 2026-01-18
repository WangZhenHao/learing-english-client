import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
    const store = await cookies();
    // const locale = store.get('locale')?.value || 'zh';
    // Static for now, we'll change this later
    const locale = "zh";

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
