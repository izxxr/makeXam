import { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { SaveOutlined } from "@ant-design/icons";
import { $typst } from "@myriaddreamin/typst.ts";
import type { Exam } from "../types";

interface PreviewProps  {
    exam: Exam
}

async function getMainContent () {
    let res = await fetch("/plain.typ")
    if (!res.ok) {
        throw res;
    }
    return await res.text();
}

export default function Preview(props: PreviewProps) {
    const [mainContent, setMainContent] = useState("");
    const previewDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        $typst.setCompilerInitOptions({
            getModule: () =>
            'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
        });
        $typst.setRendererInitOptions({
            getModule: () =>
            'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
        });
        getMainContent().then(setMainContent).catch(console.error);
    }, [])

    useEffect(() => {
        if (previewDiv.current) {
            $typst.canvas(
                previewDiv.current,
                { mainContent: mainContent, inputs: {exam: JSON.stringify(props.exam)} }
            )
        }
    }, [props.exam, mainContent]);

    return (
        <div className="w-full overflow-y-scroll z-0 h-screen relative flex">
            <div ref={previewDiv}>
                <div className="px-80 py-80">
                    <Spinner label="Loading preview..." size="lg"  />
                </div>
            </div>
            <div className="absolute z-10 w-20 m-10">
                <Button color="default" onMouseDown={() => {
                    $typst.pdf({ mainContent: mainContent, inputs: {exam: JSON.stringify(props.exam)} })
                        .then((v) => {
                            if (!v) {
                                return
                            }

                            let obj = new Blob([v], { type: "application/pdf" });
                            let url = window.URL.createObjectURL(obj);
                            let tempLink = document.createElement("a");

                            tempLink.href = url
                            tempLink.setAttribute("download", "makeXam-exam.pdf")
                            tempLink.click()
                        })
                }}>
                    <SaveOutlined />
                    Export
                </Button>
            </div>
        </div>
    )
}