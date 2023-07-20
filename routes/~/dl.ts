import * as ytdl from "https://deno.land/x/ytdl_core@v0.1.2/mod.ts";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const link = url.searchParams.get("link");
    if (!link)
        return new Response("missing `link`", {
            status: 400,
        });
    const id = ytdl.getVideoID(link);
    const stream = await ytdl.ytdl(id, {
        filter: "audioonly",
        quality: "highestaudio",
    });

    //TODO: save response to `caches` to be able to send it to tg
    const response = new Response(stream, {
        headers: {
            "x-total": stream.total.toString(),
            "x-name": encodeURIComponent(
                `${stream.info.videoDetails.title}.webm`
            ),
        },
    });

    return response;
}
