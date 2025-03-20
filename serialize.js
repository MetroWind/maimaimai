async function compressObj(obj)
{
    let encoder = new TextEncoder();
    const bytes = encoder.encode(JSON.stringify(obj));
    let blob = new Blob([bytes]);
    const ds = new CompressionStream("gzip");
    const compressed = blob.stream().pipeThrough(ds);
    let compressed_blob = await new Response(compressed).blob();
    const reader = new FileReader();
    return new Promise((resolve, _) => {
        reader.onloadend = (event) => {
            const result = event.target.result;
            resolve(result.replace(/^data:.+;base64,/, '')
                    .replaceAll("/", "-").replaceAll("+", "_"));
        }
        reader.readAsDataURL(compressed_blob);
    });
}

function decompressObj(s)
{
    const decoded = window.atob(s.replaceAll("_", "+").replaceAll("-", "/"));
    const decoded_array = Uint8Array.from(decoded, c => c.charCodeAt(0));
    let blob = new Blob([decoded_array]);
    const cs = new DecompressionStream("gzip");
    const decompressed = blob.stream().pipeThrough(cs);
    return new Response(decompressed).json();
}
