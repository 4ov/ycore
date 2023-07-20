import {
    createTRPCProxyClient,
    httpBatchLink,
    loggerLink,
} from "https://esm.sh/@trpc/client@10.34.1";
import { useState } from "react";
import { MainRouter } from "~/lib/trpc.ts";

const proxy = createTRPCProxyClient<MainRouter>({
    links: [loggerLink(), httpBatchLink({ url: "/trpc" })],
});

export default function Index() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [finalUrl, setFinalUrl] = useState("");
    async function start(link: string) {
        setLoading(true);
        setFinalUrl("");
        const url = new URL(`/~/dl`, location.href);
        url.searchParams.set("link", link);
        await fetch(url).then(async (d) => {
            if (!d.body) throw new Error("Empty body");
            const total = +d.headers.get("x-total")!;
            let downloaded = 0;
            const reader = d.body.getReader();
            const chunks: Uint8Array[] = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                downloaded += value.length;
                setProgress((downloaded / total) * 100);
                chunks.push(value);
            }

            const name = decodeURIComponent(
                d.headers.get("x-name") || "audio.webm"
            );

            const result = new File(chunks, name, {});
            const resultUrl = URL.createObjectURL(result);
            setFinalUrl(resultUrl);
            setLoading(false);
        });
    }

    return (
        <div className="container mx-auto flex-1 flex flex-col gap-3 p-4">
            {loading && (
                <div className="flex items-center gap-3">
                    <span className="loading loading-spinner loading-sm"></span>
                    <progress
                        className="progress progress-primary w-56"
                        value={progress}
                        max="100"
                    ></progress>
                </div>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    start(new FormData(e.currentTarget).get("link") as string);
                }}
                className="flex gap-3 items-center"
            >
                <input
                    type="url"
                    className="input input-bordered input-primary"
                    placeholder="Your link please"
                    name="link"
                    required
                />
                <button className="btn btn-primary">
                <i className="gg-software-download"></i>
                </button>
            </form>
            {finalUrl && (
                <>
                    <a
                        href={finalUrl}
                        download
                        className="btn btn-primary w-fit"
                    >
                        Save
                    </a>
                </>
            )}
        </div>
    );
}
