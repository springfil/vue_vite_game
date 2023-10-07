export async function loadImage(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve()
        img.onerror = () => reject()
    })
}
