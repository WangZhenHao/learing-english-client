import { useTranslations } from "next-intl"

export default function NotFound() {
    const t = useTranslations('layout')
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-500 mt-2">{t('notfound')}</p>
      </div>
    )
  }
  