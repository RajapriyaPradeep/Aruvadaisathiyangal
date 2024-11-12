// /api/githubProxy.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { fileName, fileContent } = req.body;
    const githubToken = process.env.GITHUB_TOKEN;  // Access token securely on the server side
    const url = `https://api.github.com/repos/RajapriyaPradeep/basics_studies/contents/${file.name}`;
    // const url = `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/${fileName}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${githubToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: `Upload ${fileName}`,
                content: fileContent,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json({ downloadUrl: data.content.download_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "File upload failed" });
    }
}
