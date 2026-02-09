"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { optimize, createArticel } from "@/api/course";
import { getUserInfo } from "@/api/login";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import MySelect from "./_components/select";
import { langMap, charaterMap, speakRateMap, transtlateRateMap } from "./_components/map";
import SelectCatergory from "./_components/SelectCatergory";
import useAuth from "@app/(auth)/_component/useAuth";
import "./_components/index.scss";
import { useTranslations } from "next-intl";
import { useLocalStorageState } from "ahooks";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const deespeekCount = 2;
const uidList = ["admin", "tester"];
const CreatePage = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({});
    const currentLocale = useLocale();
    // const [targetLang, setTargetLang] = useState("en");
    // const [owerLang, setOwerLang] = useState("zh");
    // const [character, setCharater] = useState("female");
    // const [speakRate, setSpeakRate] = useState("0.8");
    // const [categoryId, setCategoryId] = useState("other");
    const { userInfo, setLocalValue } = useAuth();
    const [createParams, setCreateParams] = useLocalStorageState('createParams', {
        defaultValue: {
            categoryId: "other",
            character: "female",
            speakRate: "0.8",
            targetLang: "en",
            owerLang: "zh"
        }
    })

    const t = useTranslations("create");
    const languageMap = useTranslations('language');
    const characterMap = useTranslations('character')
    const speakEnRateMap = useTranslations('speakRate')

    const setValueHanlde = (key, value) => {
        setCreateParams({
            ...createParams,
            [key]: value
        })
    }
    const loginHanlder = (e) => {
        e.preventDefault();
        const callback = currentLocale === 'zh' ? '/create' : `/${currentLocale}/create` 
        router.push("/login?callback=" + encodeURIComponent(callback));
    };
    useEffect(() => {
        if (userInfo?.id) {
            getUser();
        }
        // console.log(currentLocale)
    }, [userInfo?.id]);
    // console.log(result.sentences.map(item => item.sentence).join('\n'));
    const clickHandler = (e) => {
        e.preventDefault();
        const {
            targetLang,
            owerLang,
        } = createParams;

        if (!text) {
            toast(t('check.textError'), {
                // duration: 1000000,
            });
            return;
        } else if (owerLang === targetLang) {
            toast(t('check.langError'));
            return;
        } else if (text.length < 150) {
            toast(t('check.textLengError'));
            return;
        }
        // setOpen(true);
        setLoading(true);
        optimize({ context: text, targetLang, owerLang })
            .then((res) => {
                setOpen(true);
                setResult(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const getUser = () => {
        getUserInfo().then((res) => {
            setLocalValue(res.data);
        }).catch(error => {
            if(error.response.status === 401) {
                setLocalValue({})
            }
            // console.log(error);
            // debugger
        })
    };
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if form is valid using browser validation
        const form = e.target.closest("form");
        if (form && !form.checkValidity()) {
            // If form is invalid, let browser show validation messages
            form.reportValidity();
            return;
        }

        const {
            targetLang,
            character,
            speakRate,
            owerLang,
            categoryId,
        } = createParams;

        if (targetLang === owerLang) {
            toast(t('check.langError'));
            return;
        }

        setLoading(true);
        createArticel({
            title: result.title,
            sentences: result.sentences,
            targetLang,
            character,
            speakRate,
            owerLang,
            categoryId,
        })
            .then((res) => {
                setOpen(false);
                setText('')
                toast(t('check.sumbitSuccess'));
                setTimeout(() => {
                    router.push("/my-course");
                }, 10)
                getUser();
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const inputHandle = (e) => {
        setText(e.target.value);
    };
    const ButtonFunc = () => {
        if (userInfo?.id) {
            // return (
            //     <Button
            //         loading={loading}
            //         className="mt-5"
            //         onClick={clickHandler}
            //     >
            //         {loading
            //             ? "生成中，1-2分钟完成，请稍等..."
            //             : `生成语音文章`}
            //     </Button>
            // );
            const count = deespeekCount - userInfo.deepseekCount
            return uidList.includes(userInfo.uid) ? (
                <Button
                    loading={loading}
                    className="mt-5"
                    onClick={clickHandler}
                >
                    {loading ? t("submitting") : t("submit")}
                </Button>
            ) : (
                <Button
                    loading={loading}
                    className="mt-5"
                    onClick={clickHandler}
                    disabled={count <= 0}
                >
                    {
                        loading
                            ? t("submitting")
                            : t("submitCount", {
                                  count: count <= 0 ? 0 : count,
                              })
                        // `生成语音文章, 今天剩余次数${
                        //       deespeekCount - userInfo.deepseekCount
                        //   }`
                    }
                </Button>
            );
        } else {
            return (
                <Button className="mt-5" onClick={loginHanlder}>
                    {t('tologin')}
                </Button>
            );
        }
    };
    return (
        <>
            <form className="create">
                <div className="space-y-2 grid grid-cols-4 gap-4">
                    <Field>
                        <FieldLabel htmlFor="city">
                            {t("owerLangLabel")}
                        </FieldLabel>
                        <MySelect
                            disabled={loading}
                            onChange={(e) => {
                                // setOwerLang(e);
                                setValueHanlde('owerLang', e)
                            }}
                            value={createParams.owerLang}
                            placeholder={`${t("owerLangLabel")}`}
                            list={Object.keys(langMap).map((item) => {
                                return {
                                    value: item,
                                    // label: langMap[item],
                                    label: languageMap(item)
                                };
                            })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">
                            {t("targetLangLabel")}
                        </FieldLabel>
                        <MySelect
                            disabled={loading}
                            onChange={(e) => {
                                // setTargetLang(e);
                                setValueHanlde('targetLang', e)
                            }}
                            placeholder={t("targetLangLabel")}
                            value={createParams.targetLang}
                            list={Object.keys(langMap).map((item) => {
                                return {
                                    value: item,
                                    // label: langMap[item],
                                    label: languageMap(item)
                                };
                            })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">
                            {t("characterLabel")}
                        </FieldLabel>
                        <MySelect
                            onChange={(e) => {
                                // setCharater(e);
                                setValueHanlde('character', e)
                            }}
                            disabled={loading}
                            placeholder={t("characterLabel")}
                            value={createParams.character}
                            list={Object.keys(charaterMap).map((item) => {
                                return {
                                    value: item,
                                    // label: charaterMap[item],
                                    label: characterMap(item)
                                };
                            })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="zip">
                            {t("speakRateLabel")}
                        </FieldLabel>
                        <MySelect
                            onChange={(e) => {
                                // setSpeakRate(e);
                                setValueHanlde('speakRate', e)
                            }}
                            disabled={loading}
                            value={createParams.speakRate}
                            placeholder={t("speakRateLabel")}
                            list={Object.keys(speakRateMap).map((item) => {
                                return {
                                    value: item,
                                    // label: speakRateMap[item],
                                    label: speakEnRateMap(transtlateRateMap[item])
                                };
                            })}
                        />
                    </Field>
                </div>
                {uidList.includes(userInfo?.uid) && (
                    <div className="space-y-2  grid grid-cols-4 gap-4">
                        <Field>
                            <Label htmlFor="confirmPassword">
                                {t("categoryLabel")}
                            </Label>
                            <SelectCatergory
                                disabled={loading}
                                placeholder={t("categoryLabel")}
                                onChange={(e) => {
                                    // setCategoryId(e);
                                    setValueHanlde('categoryId', e)
                                }}
                                value={createParams.categoryId}
                            />
                        </Field>
                    </div>
                )}
                <div className="py-2">
                    <Field>
                        <Label htmlFor="confirmPassword">
                            {t("dialogSentenceLabel")}
                        </Label>
                        <Textarea
                            disabled={loading}
                            style={{ height: "60vh" }}
                            onInput={inputHandle}
                            placeholder={t("areaPlaceholder")}
                            maxLength={6000}
                        />
                    </Field>
                </div>

                <ButtonFunc />
            </form>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent style={{ "--container-lg": "720px" }}>
                    <DialogHeader>
                        <DialogTitle>{t("dialogContent")}</DialogTitle>
                    </DialogHeader>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>{t("dialogTitleLabel")}</FieldLabel>
                                <Input
                                    required
                                    value={result.title}
                                    onInput={(e) => {
                                        setResult({
                                            ...result,
                                            title: e.target.value,
                                        });
                                    }}
                                />
                            </Field>
                            <Field>
                                <FieldLabel>
                                    {t("dialogSentenceLabel")}
                                </FieldLabel>
                                <Textarea
                                    readOnly
                                    style={{ height: "400px" }}
                                    value={result.sentences
                                        ?.map(
                                            (item) =>
                                                item.sentence +
                                                "\n" +
                                                item.means
                                        )
                                        .join("\n\n")}
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <Button
                                className="mt-2.5"
                                onClick={submitHandler}
                                loading={loading}
                            >
                                {t("dialogSubmit")}
                            </Button>
                        </DialogFooter>
                    </form>
                    {/* <p>你的数据已经提交成功</p> */}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreatePage;
